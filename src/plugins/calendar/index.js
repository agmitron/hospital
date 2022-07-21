import {
	timePeriodsForDisplay,
	invisibilityModifier,
} from '../../utils/constants.js';
import { getDOMElements, renderAllCalendarElements } from './rendering.js';
import {
	getCurrentDayData,
	getDaysArray,
	getDaysElementsArr,
} from './logic.js';

export function initCalendar(containerSelector, onDateClick) {
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
		calendarGridContainer,
		todayBtnElement,
	} = getDOMElements(containerSelector);

	// ------------------------ объявляем переменные ---------------------

	let { currentYear, currentMonth } = getCurrentDayData();
	let displayedPeriod = timePeriodsForDisplay.month;
	// текущий массив дней для отрисовки сетки (элемент массива - объект с полями: data, month, year, dateObj)
	let daysArray = getDaysArray(currentYear, currentMonth);
	// текущий массив html-элементов дней для отрисовки сетки
	let daysElementsArr = getDaysElementsArr({
		daysArray,
		dayTemplateElement,
		currentMonth,
		onClick: onDateClick,
	}
	);

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
		});
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
		});
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
		});
	});

	// Переключение отображаемого периода (кнопка "Сегодня")
	todayBtnElement.addEventListener('mouseup', (e) => {
		// меняем значение переменной отображаемого периода на день
		if (displayedPeriod !== timePeriodsForDisplay.day) {
			displayedPeriod = timePeriodsForDisplay.day;
			// для дня сетка календаря не должна отображаться, поэтому убираем её
			calendarGridContainer.classList.add(invisibilityModifier);
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
		});
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
	});

	// ---------------------- вспомогательные функции ------------------------
	// Функция обновления сетки календаря
	const updateCalendarGrid = (currentYear, currentMonth) => {
		daysArray = getDaysArray(currentYear, currentMonth);
		// обновляем массив html-элементов для отрисовки
		daysElementsArr = getDaysElementsArr({
			daysArray,
			dayTemplateElement,
			currentMonth,
			onClick: onDateClick,
		});
	};
}
