import {
	timePeriodsForDisplay,
	invisibilityModifier,
} from '../../utils/constants.js';
import { getDOMElements, renderAllCalendarElements } from './rendering.js';
import {
	getDaysArray,
	getDaysElementsArr,
} from './logic.js';
import { getCurrentDayData, getCurrentWeekAsArray, getDottedDateString } from '../../utils/dateUtils.js';

const filters = {
	'day': event => event.date === getDottedDateString(),
	'week': event => getCurrentWeekAsArray().includes(event.date),
	'month': month => event => event.date.slice(3, 5) === String(month).padStart(2, '0'),
};


export function initCalendar(containerSelector, updateEvents, events) {
	// --------------------- выбираем DOM элементы ------------------------
	const {
		daysListContainer,
		dayTemplateElement,
		prevMonthBtnElement,
		nextMonthBtnElement,
		currentYearElement,
		currentYearElementForMobile,
		currentMonthElement,
		currentPeriodElement,
		changePeriodBtnElement,
		leftBtnElement,
		calendarGridContainer,
		todayBtnElement,
	} = getDOMElements(containerSelector);

	// ------------------------ объявляем переменные ---------------------

	let { currentYear, currentMonth } = getCurrentDayData();
	let displayedPeriod = timePeriodsForDisplay.month;
	// текущий массив дней для отрисовки сетки (элемент массива - объект с полями: data, month, year, dateObj)
	let daysArray = getDaysArray(currentYear, currentMonth);
	//	console.log(events);
	// текущий массив html-элементов дней для отрисовки сетки
	let daysElementsArr = getDaysElementsArr({
		daysArray,
		dayTemplateElement,
		currentMonth,
		onClick: updateEvents,
		events,
	}
	);

	updateEvents(events.filter(filters['month'](currentMonth + 1)));

	// ------------------------------ добавляем обработчики событий --------------------------------

	// Переключение месяца на предыдущий
	prevMonthBtnElement.addEventListener('mouseup', (e) => {
		// если отображаемый период был установлен не на "месяц", то переключаем на "месяц" и показываем сетку календаря
		if (displayedPeriod !== timePeriodsForDisplay.month) {
			displayedPeriod = timePeriodsForDisplay.month;
			calendarGridContainer.classList.remove(invisibilityModifier);
		}
		// переключаем значение месяца и года
		const date = new Date(currentYear, currentMonth);
		date.setMonth(currentMonth - 1);
		currentMonth = date.getMonth();
		currentYear = date.getFullYear();
		// обновляем сетку календаря и рендерим элементы
		updateCalendarGrid(currentYear, currentMonth);
		renderAllCalendarElements({
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
			leftBtnElement,

		});
		//		console.log(currentMonth + 1);
		updateEvents(events.filter(filters['month'](currentMonth + 1)), displayedPeriod);

	});

	// Переключение месяца на следующий
	nextMonthBtnElement.addEventListener('mouseup', (e) => {
		// если отображаемый период был установлен не на "месяц", то переключаем на "месяц" и показываем сетку календаря
		if (displayedPeriod !== timePeriodsForDisplay.month) {
			displayedPeriod = timePeriodsForDisplay.month;
			calendarGridContainer.classList.remove(invisibilityModifier);
		}
		// переключаем значение месяца и года
		const date = new Date(currentYear, currentMonth);
		date.setMonth(currentMonth + 1);
		currentMonth = date.getMonth();
		currentYear = date.getFullYear();
		// обновляем сетку календаря и рендерим элементы
		updateCalendarGrid(currentYear, currentMonth);
		renderAllCalendarElements({
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
			leftBtnElement,

		});
		//		console.log(currentMonth + 1);
		updateEvents(events.filter(filters['month'](currentMonth + 1)), displayedPeriod);

	});

	// Переключение отображаемого периода (кнопка "Месяц/Неделя")
	changePeriodBtnElement.addEventListener('mouseup', (e) => {
		// меняем значение переменной отображаемого периода:
		// если был месяц - станет неделя
		if (displayedPeriod === timePeriodsForDisplay.month) {
			displayedPeriod = timePeriodsForDisplay.week;
			// для недели сетка календаря не должна отображаться, поэтому убираем её
			calendarGridContainer.classList.add(invisibilityModifier);
		}
		// если был день или неделя - станет месяц
		else if (
			displayedPeriod === timePeriodsForDisplay.week ||
			displayedPeriod === timePeriodsForDisplay.day
		) {
			displayedPeriod = timePeriodsForDisplay.month;
			// для месяца сетка календаря должна отображаться, поэтому показываем её
			calendarGridContainer.classList.remove(invisibilityModifier);
		}
		// переключаем значение месяца и года
		currentYear = new Date().getFullYear();
		currentMonth = new Date().getMonth();
		// обновляем сетку календаря и рендерим элементы
		updateCalendarGrid(currentYear, currentMonth);
		renderAllCalendarElements({
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
			leftBtnElement,

		});
		const filterFunction = displayedPeriod === 'week' ? filters['week'] : filters['month'](currentMonth + 1);
		updateEvents(events.filter(filterFunction), displayedPeriod);

	});

	// Переключение отображаемого периода (кнопка "Сегодня")
	todayBtnElement.addEventListener('mouseup', (e) => {
		// переключаем значение месяца и года

		// Используются для обновления сетки календаря, которая не нужна в режиме Сегодня - Безруков
		// currentYear = new Date().getFullYear();
		// currentMonth = new Date().getMonth();
		// меняем значение переменной отображаемого периода на день
		if (displayedPeriod !== timePeriodsForDisplay.day) {
			displayedPeriod = timePeriodsForDisplay.day;
			// для дня сетка календаря не должна отображаться, поэтому убираем её
		} else { displayedPeriod = timePeriodsForDisplay.week; }
		calendarGridContainer.classList.add(invisibilityModifier);
		// обновляем сетку календаря и рендерим элементы
		// В режиме Сегодня сетки календаря нет, так что обновлять нет необходимости - Безруков
		//		updateCalendarGrid(currentYear, currentMonth);
		renderAllCalendarElements({
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
			leftBtnElement,
		});
		updateEvents(events.filter(filters[displayedPeriod]), displayedPeriod);

	});

	// ---------------------------- отрисовываем элементы ------------------------------

	renderAllCalendarElements({
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
		leftBtnElement,
	});

	// ---------------------- вспомогательные функции ------------------------
	// Функция обновления сетки календаря
	const updateCalendarGrid = (currentYear, currentMonth) => {
		daysArray = getDaysArray(currentYear, currentMonth);
		//		console.log(daysArray);
		// обновляем массив html-элементов для отрисовки
		daysElementsArr = getDaysElementsArr({
			daysArray,
			dayTemplateElement,
			currentMonth,
			onClick: updateEvents,
			events,
		});
	};

}
