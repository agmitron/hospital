import {
	daysListContainerSelector,
	dayTemplateSelector,
	prevMonthBtnSelector,
	nextMonthBtnSelector,
	currentYearElementSelector,
	currentYearElementSelectorForMobile,
	currentMonthElementSelector,
	monthsArr,
	timePeriodsForDisplay,
	currentPeriodElementSelector,
	changePeriodBtnSelector,
	calendarGridContainerSelector,
	todayBtnSelector,
} from '../../utils/constants.js';
import { getCurrentDateString, getCurrentWeekAsString, getCurrentMonthAsString } from '../../utils/dateUtils.js';

const getDOMElements = (containerSelector) => {
	const calendarContainer = document.querySelector(containerSelector);
	const daysListContainer = calendarContainer.querySelector(daysListContainerSelector);
	const dayTemplateElement = calendarContainer.querySelector(dayTemplateSelector);
	const prevMonthBtnElement = calendarContainer.querySelector(prevMonthBtnSelector);
	const nextMonthBtnElement = calendarContainer.querySelector(nextMonthBtnSelector);
	const currentYearElement = calendarContainer.querySelector(currentYearElementSelector);
	const currentYearElementForMobile = calendarContainer.querySelector(currentYearElementSelectorForMobile);
	const currentMonthElement = calendarContainer.querySelector(currentMonthElementSelector);
	const currentPeriodElement = calendarContainer.querySelector(currentPeriodElementSelector);
	const changePeriodBtnElement = calendarContainer.querySelector(changePeriodBtnSelector);
	const calendarGridContainer = calendarContainer.querySelector(calendarGridContainerSelector);
	const todayBtnElement = calendarContainer.querySelector(todayBtnSelector);

	return {
		calendarContainer,
		daysListContainer,
		dayTemplateElement,
		prevMonthBtnElement,
		nextMonthBtnElement,
		currentYearElement,
		currentYearElementForMobile,
		currentMonthElement,
		currentPeriodElement,
		changePeriodBtnElement,
		calendarGridContainer,
		todayBtnElement,
	};
};

// Функция-отрисовщик сетки календаря
const renderDays = (container, contentArr) => {
	container.innerHTML = '';
	container.append(...contentArr);
};

// Функция-отрисовщик текущего года в шапке календаря
const renderCurrentYear = (currentYear, currentYearElement, currentYearElementForMobile) => {
	currentYearElement.textContent = currentYear;
	currentYearElementForMobile.textContent = currentYear;
};

// Функция-отрисовщик текущуго месяца в шапке календаря
const renderCurrentMonth = (currentMonth, currentMonthElement) => {
	currentMonthElement.textContent = monthsArr[currentMonth];
};

// Функция-отрисовщик выбранного периода (в зависисмости от текущего значения отображаемого периода выводит на экран либо актуальную дату (в формате дд.мм), либо актуальную неделю (в формате дд.мм-дд.мм), либо пустое место (если выбран месяц))
const renderCurrentPeriod = (displayedPeriod, currentPeriodElement) => {
	console.log('🚀 ~ file: rendering.js ~ line 67 ~ renderCurrentPeriod ~ displayedPeriod', displayedPeriod);
	let content;
	switch (displayedPeriod) {
		case timePeriodsForDisplay.day:
			content = getCurrentDateString();
			break;
		case timePeriodsForDisplay.week:
			content = getCurrentWeekAsString();
			break;
		case timePeriodsForDisplay.month:
			content = getCurrentMonthAsString();
			break;
		default:
			content = '';
	}
	currentPeriodElement.textContent = content;
};

// Функция-отрисовщик текста кнопки смены периода (неделя/месяц)
const renderChangePeriodBtnTextContent = (
	displayedPeriod,
	changePeriodBtnElement
) => {
	let content;
	switch (displayedPeriod) {
		case timePeriodsForDisplay.day:
			content = 'Месяц';
			break;
		case timePeriodsForDisplay.week:
			content = 'Месяц';
			break;
		case timePeriodsForDisplay.month:
			content = 'Неделя';
	}
	changePeriodBtnElement.textContent = content;
};

// Функция-отрисовщик всех динамических элементов календаря
const renderAllCalendarElements = ({
	daysListContainer,
	daysElementsArr,
	currentYear,
	currentYearElement,
	currentYearElementForMobile,
	currentMonth,
	currentMonthElement,
	displayedPeriod,
	currentPeriodElement,
	changePeriodBtnElement,
}) => {
	renderDays(daysListContainer, daysElementsArr);
	renderCurrentYear(
		currentYear,
		currentYearElement,
		currentYearElementForMobile
	);
	renderCurrentMonth(currentMonth, currentMonthElement);
	renderCurrentPeriod(displayedPeriod, currentPeriodElement);
	renderChangePeriodBtnTextContent(displayedPeriod, changePeriodBtnElement);
};

export {
	getDOMElements,
	renderDays,
	renderCurrentYear,
	renderCurrentMonth,
	renderCurrentPeriod,
	renderChangePeriodBtnTextContent,
	renderAllCalendarElements,
};
