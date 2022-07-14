import './index.css';
import {
	daysListContainerSelector,
	dayTemplateSelector,
	dayElementSelector,
} from '../utils/constants.js';

import EventPopup from '../utils/EventPopup.js';
import Event from '../utils/event.js';

const events = [{ title: "Сортировка", icons: ['medkit', 'aids', 'food'], metro: 'м. Обухово', hours: '10:00–17:00', address: 'Агатов переулок 37, корп 4, Санкт-Петербург', date: 'Понедельник 11 апреля' },
{ title: "Ночной приют", icons: ['shower', 'sleep', 'covid'], metro: 'м. Ломоносовская', hours: '18:00–23:00', address: 'Богатов переулок 148, корп 2, Санкт-Петербург', date: 'Вторник 12 апреля' },
{ title: "Заголовок 3", icons: ['clothdry', 'vaccine', 'shower', 'haircut'], metro: 'м. Обухово', hours: '23:00–09:00', address: 'Маратов переулок 1, корп 1, Санкт-Петербург', date: 'Среда 13 апреля' },
];


// Создаем экземпляр попапа события

const eventPopup = new EventPopup('.event-popup');

// ==================== ВЫБОР ЭЛМЕНТОВ DOM =====================

// Секция с ивентами
const eventsElement = document.querySelector('.events');

// Контейнер сетки календаря
const daysListContainer = document.querySelector(daysListContainerSelector);

// Элемент одной ячейки (дня) календаря из шаблона
const dayElement = document
	.querySelector(dayTemplateSelector)
	.content.querySelector(dayElementSelector)
	.cloneNode(true);

// ==================== ОБЪЯВЛЕНИЯ ФУНКЦИЙ =====================

// Функция получения значений текущего года, месяца, даты и дня недели
const getCurrentDayData = () => {
	const currentDateObj = new Date();
	return {
		currentYear: currentDateObj.getFullYear(),
		currentMonth: currentDateObj.getMonth(),
		currentDate: currentDateObj.getDate(),
		currentWeekDay: currentDateObj.getDay(),
	};
};

// Функция определения високосного года
const isLeapYear = (year) => {
	if (
		(!(year % 4) && !(year % 100) && !(year % 400)) ||
		(!(year % 4) && year % 100)
	) {
		return true;
	}
	return false;
};

// Функция получения последнего числа в месяце
const getLastDateOfMonth = (year, month) => {
	month = String(month);
	const daysAmount = {
		0: 31,
		2: 31,
		3: 30,
		4: 31,
		5: 30,
		6: 31,
		7: 31,
		8: 30,
		9: 31,
		10: 30,
		11: 31,
	};
	if (!(month === '1')) {
		return daysAmount[month];
	}
	if (isLeapYear(year)) {
		return 29;
	}
	return 28;
};

// Функция получения первого и последнего дня недели в месяце
const getFirstAndLastDaysOfMonth = (year, month) => {
	const currentDateObj = new Date(year, month);

	const lastDateOfMonth = getLastDateOfMonth(year, month);
	console.log(
		'🚀 ~ file: index.js ~ line 71 ~ getFirstAndLastDaysOfMonth ~ lastDateOfMonth',
		lastDateOfMonth
	);
	const lastWeekDayOfMonth = currentDateObj.getDay(lastDateOfMonth);
	console.log(
		'🚀 ~ file: index.js ~ line 77 ~ getFirstAndLastDaysOfMonth ~ lastWeekDayOfMonth',
		lastWeekDayOfMonth
	);

	const firstWeekDayOfMonth = currentDateObj.getDay(1);
	console.log(
		'🚀 ~ file: index.js ~ line 79 ~ getFirstAndLastDaysOfMonth ~ firstWeekDayOfMonth',
		firstWeekDayOfMonth
	);

	return { firstWeekDayOfMonth, lastWeekDayOfMonth };
};
console.log(getFirstAndLastDaysOfMonth(2022, 5));

// Функция получения массива дней (чисел) календаря для последующей отрисовки
const getDaysArray = () => {
	// const currentDateObj = new Date();
	// const currentYear = currentDateObj.getFullYear();
	// const currentMonth = currentDateObj.getMonth();
	// const currentDate = currentDateObj.getDate();
	// const currentWeekDay = currentDateObj.getDay();
	// const firstDateOfCurrentMonth = currentDateObj.setDate(1);
	// console.log('🚀line 36 ~ firstDayOfCurrentMonth -', firstDayOfCurrentMonth);
	// const lastDateOfCurrentMonth = currentDateObj.setDate(1);
};

// Функция-отрисовщик сетки календаря
const renderDays = (elementsArray) => {
	console.log(
		'🚀 ~ file: index.js ~ line 36 ~ elementsArray ~ elementsArray',
		elementsArray
	);
	elementsArray.forEach((item) => {
		container.append(item);
	});
};

// ==================== ОСНОВНОЙ АЛГОРИТМ =====================

// Получаем массив дней для отрисовки
// getDaysArray();

// Отрисовываем сетку дней календаря
// daysRender();

const eventTemplateSelector = '.event-template';

events.forEach(event => eventsElement.append(new Event(eventTemplateSelector, event, () => eventPopup.open(event))));
