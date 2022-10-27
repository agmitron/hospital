
const dayLength = 1000 * 60 * 60 * 24;

// Функция получения значений текущего года, месяца, даты и дня недели
const getCurrentDayData = () => {
    const currentDateObj = new Date();
    return {
        currentDateObj: currentDateObj,
        currentYear: currentDateObj.getFullYear(),
        currentMonth: currentDateObj.getMonth(),
        currentDate: currentDateObj.getDate(),
        currentWeekDay: currentDateObj.getDay(),
    };
};

const getDottedDateString = (date) => {
    const dateObj = date ? new Date(date) : new Date();
    return `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()}`;
}

const getCurrentDateString = (date) => {
    const dateObj = date ? new Date(date) : new Date();
    return `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
}

const getCurrentWeekMonday = () => {
    const dateObj = new Date();
    const epoch = dateObj.getTime();
    const dayOfWeek = dateObj.getDay() || 7;
    return epoch - (dayOfWeek - 1) * dayLength;
}

const getCurrentWeekAsArray = () => {
    const daysArray = [];
    const monday = getCurrentWeekMonday();
    for (let i = 0; i < 7; i++) {
        daysArray.push(getDottedDateString(monday + i * dayLength));
    }
    return daysArray;
}

const getCurrentWeekAsString = () => {
    const monday = getCurrentWeekMonday();
    const sunday = monday + 6 * dayLength;
    return `${getCurrentDateString(monday)}-${getCurrentDateString(sunday)}`;
}

const getCurrentMonthAsString = () => {
  const { currentYear, currentMonth } = getCurrentDayData();
  const lastDateOfCurrentMonth = getLastDateOfMonth(currentYear, currentMonth);
  const currentMonthAsString = `01.${String(currentMonth + 1).padStart(2, 0)}-${lastDateOfCurrentMonth}.${String(
    currentMonth + 1
  ).padStart(2, 0)}`;
  console.log('🚀 ~ file: dateUtils.js ~ line 54 ~ currentMonthAsString ~ currentMonthAsString', currentMonthAsString);
  return currentMonthAsString;
};

// Функция получения последнего числа в месяце
const getLastDateOfMonth = (year, month) => {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
};

// Функция получения первого и последнего дня недели в месяце
const getFirstAndLastDaysOfMonth = (year, month) => {
  // первый день месяца
  let dateObj = new Date(year, month, 1);
  const firstWeekDayOfMonth = dateObj.getDay();
  // последний день месяца
  const lastDateOfMonth = getLastDateOfMonth(year, month);
  dateObj = new Date(year, month, lastDateOfMonth);
  const lastWeekDayOfMonth = dateObj.getDay();
  return { firstWeekDayOfMonth, lastWeekDayOfMonth };
};

function makeDateObj(dateString) {
  const [day, month, year] = dateString.split('.');
  return new Date(year, month - 1, day);
}

function makeSideDate(dateString) {
  const date = makeDateObj(dateString);
  return date.toLocaleString('ru', { weekday: 'short', day: 'numeric' }).toUpperCase().replace(',', '');
}

function makeTitleDate(dateString) {
  const date = makeDateObj(dateString);
  return date
    .toLocaleString('ru', { weekday: 'long', day: 'numeric', month: 'numeric' })
    .toUpperCase()
    .replace(',', '');
}

function isToday(dateString) {
  const date = makeDateObj(dateString);
  const today = new Date();
  return date.toLocaleDateString() === today.toLocaleDateString();
}

export {
  getCurrentDayData,
  getCurrentDateString,
  getCurrentWeekAsString,
  getCurrentMonthAsString,
  getLastDateOfMonth,
  getFirstAndLastDaysOfMonth,
  getCurrentWeekAsArray,
  getDottedDateString,
  makeSideDate,
  makeTitleDate,
  isToday,
};