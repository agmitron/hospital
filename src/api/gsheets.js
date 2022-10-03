import { eventObject } from '../utils/EventObject.js';

// const exampleEvent = {
//   date: '10.10.2022',
//   title: 'Сортировка',
//   metro: 'м. «Площадь Восстания»',
//   address: 'Санкт-Петербург, Агатов переулок 37, корп 4',
//   cancelled: false,
//   services: [
//     {
//       hours: '10:00-17:00',
//       activities: ['Прием врача, перевязка ран', 'Вакцинация', 'Тест на ВИЧ', 'Телефон', 'Тест на COVID', 'Выдача лекарств']
//     },
//     {
//       hours: '13:00-16:00',
//       activities: ['Парикмахер']
//     },
//     {
//       hours: '15:00-17:00',
//       activities: ['Соц. помощь']
//     },
//   ]
// };
const titlesProps = { 'Дата': 0, 'Заголовок': 1, 'Часы работы': 2, 'Метро': 5, 'Адрес': 4, 'Активности': 3, 'Отменен?': 6, };

async function getData({ sheetId, apiKey, sheetName = '', sheetNumber = 1 }) {
  const sheetNameStr = sheetName !== '' ? encodeURIComponent(sheetName) : `Лист${sheetNumber}`
  const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetNameStr}?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&key=${apiKey}`;
  const resultArray = [];
  const { values } = await fetch(sheetsUrl).then(res => res.ok ? res.json() : Promise.reject('Error in fetch'));
  let [lastDate, lastTitle, lastHours, lastAddress, lastMetro] = ['', '', '', '', ''];
  for (let row of values) {
    const [currentDate, currentTitle, currentHours, currentAddress, currentMetro, currentActivity, isCancelled] =
      [
        row[titlesProps['Дата']],
        row[titlesProps['Заголовок']],
        row[titlesProps['Часы работы']],
        row[titlesProps['Адрес']],
        row[titlesProps['Метро']],
        row[titlesProps['Активности']],
        row[titlesProps['Отменен?']],
      ];
    lastAddress = currentAddress ? currentAddress : lastAddress;
    lastMetro = currentMetro ? currentMetro : lastMetro;
    if ((currentDate && lastDate !== currentDate) || (currentTitle && lastTitle !== currentTitle)) {
      console.log(currentDate, lastDate);
      lastDate = currentDate ? currentDate : lastDate;
      lastTitle = currentTitle ? currentTitle : lastTitle;
      console.log(currentDate, lastDate);
      if (eventObject.isValid()) { resultArray.push(eventObject.get()); }
      eventObject.init();
      eventObject.set({
        date: lastDate,
        title: lastTitle,
        metro: lastMetro,
        address: lastAddress,
        isCancelled: isCancelled != null
      });
      eventObject.addService({ hours: currentHours, activity: currentActivity });
    } else if (currentHours && (currentHours !== lastHours)) {
      lastHours = currentHours;
      eventObject.addService({ hours: currentHours, activity: currentActivity });
    } else if (currentActivity) {
      eventObject.addActivity(currentActivity);
    } else {
      console.log('Неизвестный формат строки, строка проигнорирована', row);
    }
  }
  if (eventObject.isValid()) { resultArray.push(eventObject.get()); }

  console.log(resultArray);
  return resultArray;
}

// В настоящее время функция не используется
function doFilter(values, filter) {
  // В настоящее время в фильтре может быть только один ключ - значение строка или массив
  // Если массив, то к его элементам применяется условие ИЛИ
  const fieldName = Object.keys(filter)[0];
  //    console.log('filter', typeof filter[fieldName], fieldName);
  if (typeof filter[fieldName] === 'object') {
    return values.filter(item => filter[fieldName].some(filterItem => filterItem === item[fieldName]));
  }
  else {
    return values.filter(item => item[fieldName] === filter[fieldName]);
  }
}

export async function gsheets({ filter, ...options }) {
  const values = await getData(options);
  return filter ? doFilter(values, filter) : values;
}