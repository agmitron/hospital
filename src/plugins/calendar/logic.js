import { dayElementSelector } from '../../utils/constants.js';
import {
	getLastDateOfMonth,
	getFirstAndLastDaysOfMonth
} from '../../utils/dateUtils.js';

// Функция получения массива дат календаря для текущего месяца с добавками чисел в начале и в конце массива от предыдущего и последующего месяцев
const getDaysArray = (currentYear, currentMonth) => {
	const daysArray = [];
	const lastDateOfMonth = getLastDateOfMonth(currentYear, currentMonth);
	// заполняем массив датами текущего месяца
	for (let i = 0; i < lastDateOfMonth; i++) {
		daysArray[i] = {
			date: i + 1,
			month: currentMonth,
			year: currentYear,
			dateObj: new Date(currentYear, currentMonth, i + 1),
		};
	}
	// определяем добавки дней слева и справа от теущего месяца
	// для этого сначала находим первый и последний дни текущего месяца
	const { firstWeekDayOfMonth, lastWeekDayOfMonth } =
		getFirstAndLastDaysOfMonth(currentYear, currentMonth);
	// определяем дни слева от текущего месяца и добавляем их в массив
	const addedDaysToStart =
		firstWeekDayOfMonth === 0 ? 6 : firstWeekDayOfMonth - 1;
	if (addedDaysToStart) {
		const tempDateObj = new Date(currentYear, currentMonth - 1);
		const lastDateOfPrevMonth = getLastDateOfMonth(
			tempDateObj.getFullYear(),
			tempDateObj.getMonth()
		);
		for (let i = 0; i < addedDaysToStart; i++) {
			tempDateObj.setDate(lastDateOfPrevMonth - i);
			daysArray.unshift({
				date: tempDateObj.getDate(),
				month: tempDateObj.getMonth(),
				year: tempDateObj.getFullYear(),
				dateObj: new Date(
					tempDateObj.getDate(),
					tempDateObj.getMonth(),
					tempDateObj.getFullYear()
				),
			});
		}
	}
	// определяем дни справа от текущего месяца и добавляем их в массив
	const addedDaysToEnd = lastWeekDayOfMonth === 0 ? 0 : 7 - lastWeekDayOfMonth;
	if (addedDaysToEnd) {
		const tempDateObj = new Date(currentYear, currentMonth + 1);
		for (let i = 0; i < addedDaysToEnd + 7; i++) {
			tempDateObj.setDate(1 + i);
			daysArray.push({
				date: tempDateObj.getDate(),
				month: tempDateObj.getMonth(),
				year: tempDateObj.getFullYear(),
				dateObj: new Date(
					tempDateObj.getDate(),
					tempDateObj.getMonth(),
					tempDateObj.getFullYear()
				),
			});
		}
	}
	return daysArray;
};

const getEventsPerDate = (events, date) => {
	const dateString = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
	return events.filter(event => event.date === dateString);
}

// Функция получения массива html-элементов - ячеек сетки календаря из массива дней
const getDaysElementsArr = (
	{ daysArray,
		dayTemplateElement,
		currentMonth,
		pressedDayElement,
		onClick,
		events,
	}
) => {
	return daysArray.map((item, itemIndex) => {
		const dayElement = dayTemplateElement.content
			.querySelector(dayElementSelector)
			.cloneNode(true);
		// на всякий случай сохранем в элементе соответствующий ему объект даты
		dayElement.dateObj = item.dateObj;
		// вставляем контент (дату)
		dayElement.prepend(String(item.date));

		// -------------------------------------------------------
		// СЮДА НУЖНО БУДЕТ ДОБАВИТЬ ЛОГИКУ ОТОБРАЖЕНИЯ В ЭЛЕМЕНТЕ ДАТЫ КРАСНЫХ ТОЧЕК, ОБОЗНАЧАЮЩИХ СОБЫТИЯ (одно событие - одна точка, два события - две точки, три и более событий - три точки). В стилях это блок "calendar-day__event" и его модификатор "_invisible".
		//		console.log(events);
		const eventsWrapper = dayElement.querySelector('.calendar-day__events-wrap');
		const eventsPerDate = getEventsPerDate(events, item.dateObj);
		const numberOfDots = eventsPerDate.length >= 3 ? 3 : eventsPerDate.length;
		for (let i = 0; i < numberOfDots; i++) {
			const dot = document.createElement('div');
			dot.innerHTML = `<div class="calendar-day__event" ></div>`;
			eventsWrapper.append(dot.firstChild);
		}
		//--------------------------------------------------------

		// добавляем обводку для текущей даты (при условии, что отображаемые месяц и год являются актуальными)
		if (
			item.date === new Date().getDate() &&
			item.month === new Date().getMonth() &&
			item.year === new Date().getFullYear()
		) {
			dayElement.classList.add('calendar-day_type_current');
		}
		// добавляем обработчик клика даты
		dayElement.addEventListener('click', (e) => {
			// добавляем подсветку для кликнутой даты
			if (pressedDayElement) {
				// если ранее уже кликали другую дату, то с неё подсветку убираем
				pressedDayElement.classList.remove('calendar-day_type_pressed');
			}
			// назначаем новую кликнутую дату и добавляем подсветку
			//			const 
			pressedDayElement = e.currentTarget;
			pressedDayElement.classList.add('calendar-day_type_pressed');
			// выводим кликнутую дату в консоль
			//			console.log(pressedDayElement.dateObj);

			// -------------------------------------------------------
			// СЮДА НУЖНО БУДЕТ ДОБАВИТЬ ЛОГИКУ ОТОБРАЖЕНИЯ КАРТОЧЕК СОБЫТИЙ!!!!!!!!!!!!

			onClick && onClick(eventsPerDate);

			//--------------------------------------------------------
		});

		// для дат соседних месяцев добавляем тусклый цвет, убираем обводку текущей даты
		if (item.month !== currentMonth) {
			dayElement.classList.add('calendar-day_type_dim');
			dayElement.classList.remove('calendar-day_type_current');
		}
		return dayElement;
	});
};

export {
	getDaysArray,
	getDaysElementsArr,
};
