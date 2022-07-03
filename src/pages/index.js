import {
	calendarContainerSelector,
	daysListContainerSelector,
	dayTemplateSelector,
	dayElementSelector,
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
	invisibilityModifier,
} from '../utils/constants.js';

// ЗДЕСЬ ВСЯ ЛОГИКА ОТРИСОВКИ И ПЕРЕКЛЮЧЕНИЯ КАЛЕНДАРЯ!!! (обернута в функцию initCalendar(calendarContainer))

const initCalendar = (calendarContainer) => {
	// ==================== ВЫБОР ЭЛМЕНТОВ DOM ====================

	// Контейнер сетки календаря
	const daysListContainer = calendarContainer.querySelector(
		daysListContainerSelector
	);
	// Элемент шаблона одной ячейки (дня) календаря из шаблона
	const dayTemplateElement =
		calendarContainer.querySelector(dayTemplateSelector);
	// Элемент кнопки переключения месяца на предыдущий
	const prevMonthBtnElement =
		calendarContainer.querySelector(prevMonthBtnSelector);
	// Элемент кнопки переключения месяца на следующий
	const nextMonthBtnElement =
		calendarContainer.querySelector(nextMonthBtnSelector);
	// Элементы, отображающие текущий год
	const currentYearElement = calendarContainer.querySelector(
		currentYearElementSelector
	);
	const currentYearElementForMobile = calendarContainer.querySelector(
		currentYearElementSelectorForMobile
	);
	//  Элемент, отображающий текущий месяц
	const currentMonthElement = calendarContainer.querySelector(
		currentMonthElementSelector
	);
	// Элемент, отображающий выбранный пользователем период времени
	const currentPeriodElement = calendarContainer.querySelector(
		currentPeriodElementSelector
	);
	// Элемент кнопки переключения отображаемого периода (месяц/неделя)
	const changePeriodBtnElement = calendarContainer.querySelector(
		changePeriodBtnSelector
	);

	// Контейнер сетки календаря
	const calendarGridContainer = calendarContainer.querySelector(
		calendarGridContainerSelector
	);
	// Элемент кнопки "Сегодня"
	const todayBtnElement = calendarContainer.querySelector(todayBtnSelector);

	// ==================== ОБЪЯВЛЕНИЯ ФУНКЦИЙ =====================

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

	// Функия получения строкового представления текущей даты (например: "11.04")
	const getCurrentDateString = () => {
		let dateObj = new Date();
		const currentDateStringISO = dateObj.toISOString();
		const currentDateString = currentDateStringISO[8] + currentDateStringISO[9];
		const currentMonthString =
			currentDateStringISO[5] + currentDateStringISO[6];
		return currentDateString + '.' + currentMonthString;
	};

	// Функия получения строкового представления текущей недели (например: "11.04-17.04")
	const getCurrentWeekString = () => {
		let dateObj = new Date();
		const currentDate = dateObj.getDate();

		const currentWeekDay = dateObj.getDay();

		const weekStartDate =
			currentDate - (currentWeekDay === 0 ? 6 : currentWeekDay - 1);
		const weekStartDateObj = new Date();
		weekStartDateObj.setDate(weekStartDate);
		const weekStartStringISO = weekStartDateObj.toISOString();
		const weekStartStringDate = weekStartStringISO[8] + weekStartStringISO[9];
		const weekStartStringMonth = weekStartStringISO[5] + weekStartStringISO[6];
		const weekStartString = weekStartStringDate + '.' + weekStartStringMonth;

		const weekEndDate =
			currentDate + (currentWeekDay === 0 ? 0 : 7 - currentWeekDay);
		const weekEndDateObj = new Date();
		weekEndDateObj.setDate(weekEndDate);
		const weekEndStringISO = weekEndDateObj.toISOString();
		const weekEndStringDate = weekEndStringISO[8] + weekEndStringISO[9];
		const weekEndStringMonth = weekEndStringISO[5] + weekEndStringISO[6];
		const weekEndString = weekEndStringDate + '.' + weekEndStringMonth;

		return weekStartString + '\u2013' + weekEndString;
	};

	// Функция получения массива чисел календаря для текущего месяца с добавками чисел в начале и в конце массива от предыдущего и последующего месяцев
	const getDaysArrayData = (
		currentYear,
		currentMonth,
		firstWeekDayOfMonth,
		lastWeekDayOfMonth,
		lastDateOfMonth
	) => {
		const daysArray = [];
		for (let i = 0; i < lastDateOfMonth; i++) {
			daysArray[i] = i + 1;
		}
		const addedDaysToStart =
			firstWeekDayOfMonth === 0 ? 6 : firstWeekDayOfMonth - 1;
		if (addedDaysToStart) {
			const dateObj = new Date(currentYear, currentMonth - 1);
			const lastDateOfPrevMonth = getLastDateOfMonth(
				dateObj.getFullYear(),
				dateObj.getMonth()
			);
			for (let i = 0; i < addedDaysToStart; i++) {
				daysArray.unshift(
					dateObj.getDate(dateObj.setDate(lastDateOfPrevMonth - i))
				);
			}
		}
		const addedDaysToEnd =
			lastWeekDayOfMonth === 0 ? 0 : 7 - lastWeekDayOfMonth;
		if (addedDaysToEnd) {
			const dateObj = new Date(currentYear, currentMonth + 1);
			for (let i = 0; i < addedDaysToEnd; i++) {
				daysArray.push(dateObj.getDate(dateObj.setDate(1 + i)));
			}
		}
		return { daysArray, addedDaysToStart, addedDaysToEnd };
	};

	// Функция получения массива html-элементов - ячеек сетки календаря из массива дней
	const getDaysElementsArr = (
		daysArray,
		addedDaysToStart,
		addedDaysToEnd,
		eventsData
	) => {
		return daysArray.map((item, itemIndex) => {
			const dayElement = dayTemplateElement.content
				.querySelector(dayElementSelector)
				.cloneNode(true);
			// сохраняем в элементе соответствующий ему объект даты, что бы в дальнейшем была возможность отображать только нужные события при клике на элемент
			dayElement.date = new Date(currentYear, currentMonth, item);
			// вставляем контент (дату)
			dayElement.prepend(String(item));

			// -------------------------------------------------------
			// СЮДА НУЖНО БУДЕТ ДОБАВИТЬ ЛОГИКУ АНАЛИЗА ПОЛУЧЕННЫХ ДАННЫХ О СОБЫТИЯХ (Параметр eventsData. Пока болтается не задействованный.) И ОТОБРАЖЕНИЯ В ЭЛЕМЕНТЕ ДАТЫ КРАСНЫХ ТОЧЕК, ОБОЗНАЧАЮЩИХ СОБЫТИЯ (одно событие - одна точка, два события - две точки, три и более событий - три точки). В стилях это блок "calendar-day__event" и его модификатор "_invisible".
			// .......
			//--------------------------------------------------------

			// добавляем обводку для текущей даты (при условии, что отображаемые месяц и год являются актуальными)
			if (
				item === new Date().getDate() &&
				currentMonth === new Date().getMonth() &&
				currentYear === new Date().getFullYear()
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
				pressedDayElement = e.currentTarget;
				pressedDayElement.classList.add('calendar-day_type_pressed');
				// выводим кликнутую дату в консоль
				console.log(pressedDayElement.date);

				// -------------------------------------------------------
				// СЮДА НУЖНО БУДЕТ ДОБАВИТЬ ЛОГИКУ ОТОБРАЖЕНИЯ КАРТОЧЕК СОБЫТИЙ!!!!!!!!!!!!
				// .......
				//--------------------------------------------------------
			});

			// для дат соседних месяцев добавляем тусклый цвет, убираем обводку текущей даты, если вдруг дата совпала с текущей, а также перезаписываем в них объект даты с правильными значениями месяца и года
			if (itemIndex < addedDaysToStart) {
				dayElement.classList.add('calendar-day_type_dim');
				dayElement.classList.remove('calendar-day_type_current');
				dayElement.date = new Date(currentYear, currentMonth - 1, item);
			}
			if (itemIndex > daysArray.length - 1 - addedDaysToEnd) {
				dayElement.classList.add('calendar-day_type_dim');
				dayElement.classList.remove('calendar-day_type_current');
				dayElement.date = new Date(currentYear, currentMonth + 1, item);
			}
			return dayElement;
		});
	};

	// Функция обновления глобальных переменных, используемых для отрисовки сетки календаря
	const updateCalendarVariables = (currentYear, currentMonth) => {
		// обновляем данные о последнем числе текущего месяца
		lastDateOfMonth = getLastDateOfMonth(currentYear, currentMonth);
		// обновляем данные о первом и последнем днях недели в текущем мессяце
		let tempObj = getFirstAndLastDaysOfMonth(currentYear, currentMonth);
		firstWeekDayOfMonth = tempObj.firstWeekDayOfMonth;
		lastWeekDayOfMonth = tempObj.lastWeekDayOfMonth;
		// обновляем массив дней для отрисовки, а также количество добавленных к нему дней от соседних месяцев слева и справа
		tempObj = getDaysArrayData(
			currentYear,
			currentMonth,
			firstWeekDayOfMonth,
			lastWeekDayOfMonth,
			lastDateOfMonth
		);
		daysArray = tempObj.daysArray;
		addedDaysToStart = tempObj.addedDaysToStart;
		addedDaysToEnd = tempObj.addedDaysToEnd;
		// обновляем массив html-элементов для отрисовки
		daysElementsArr = getDaysElementsArr(
			daysArray,
			addedDaysToStart,
			addedDaysToEnd
		);
	};

	// Функция-отрисовщик сетки календаря
	const renderDays = (container, contentArr) => {
		container.append(...contentArr);
	};

	// Функция-отрисовщик текущего года в шапке календаря
	const renderCurrentYear = (currentYear) => {
		currentYearElement.textContent = currentYear;
		currentYearElementForMobile.textContent = currentYear;
	};

	// Функция-отрисовщик текущуго месяца
	const renderCurrentMonth = (currentMonth) => {
		currentMonthElement.textContent = monthsArr[currentMonth];
	};

	// Функция-отрисовщик выбранного периода (в зависисмости от текущего значения отображаемого периода выводит на экран либо актуальную дату (в формате дд.мм), либо актуальную неделю (в формате дд.мм-дд.мм), либо пустое место (если выбран месяц))
	const renderCurrentPeriod = (displayedPeriod) => {
		let content;
		switch (displayedPeriod) {
			case timePeriodsForDisplay.day:
				content = getCurrentDateString();
				break;
			case timePeriodsForDisplay.week:
				content = getCurrentWeekString();
				break;
			case timePeriodsForDisplay.month:
				content = '';
			default:
				content = '';
		}
		currentPeriodElement.textContent = content;
	};
	// Функция-отрисовщик текста кнопки смены периода (неделя/месяц)
	const renderChangePeriodBtnTextContent = (displayedPeriod) => {
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

	// ================================ ОСНОВНОЙ АЛГОРИТМ ===============================

	// ------------------------ Глобальные переменные ---------------------

	// Текщий год и месяц - главные переменные для расчета сетки календаря. От них зависят все остальные глобальные переменные, используемые для расчета и отрисовки сетки.
	let { currentYear, currentMonth } = getCurrentDayData();
	// Отображаемый период (выбор того, что должно отображаться: дата либо неделя, либо месяц)
	let displayedPeriod = timePeriodsForDisplay.month;
	// Нажатая (кликнутая) пользователем дата (html-элемент)
	let pressedDayElement;

	// Последнее число текущего месяца
	let lastDateOfMonth = getLastDateOfMonth(currentYear, currentMonth);
	// Первый и последний дни недели текущего мессяца
	let { firstWeekDayOfMonth, lastWeekDayOfMonth } = getFirstAndLastDaysOfMonth(
		currentYear,
		currentMonth
	);
	// Текущий массив дней для отрисовки + 2 добавки дней от соседних месяцев слева и справа
	let { daysArray, addedDaysToStart, addedDaysToEnd } = getDaysArrayData(
		currentYear,
		currentMonth,
		firstWeekDayOfMonth,
		lastWeekDayOfMonth,
		lastDateOfMonth
	);
	// Текущий массив html-элементов для отрисовки
	let daysElementsArr = getDaysElementsArr(
		daysArray,
		addedDaysToStart,
		addedDaysToEnd
	);

	// ---------------------------- Первичная отрисовка элементов ------------------------------

	// Отрисовываем сетку дней календаря
	renderDays(daysListContainer, daysElementsArr);

	// Отрисовываем текущий год
	renderCurrentYear(currentYear);

	// Отрисовываем текущий месяц
	renderCurrentMonth(currentMonth);

	// Отрисовываем выбранный период
	renderCurrentPeriod(displayedPeriod);

	// Отрисовываем текст кнопки смены выбранного периода
	renderChangePeriodBtnTextContent(displayedPeriod);

	// ------------------------------ Обработчики событий --------------------------------

	// Переключение месяца на предыдущий
	prevMonthBtnElement.addEventListener('mouseup', (e) => {
		// если отображаемый период был установлен не на "месяц", то переключаем на "месяц" и показываем сетку календаря
		if (displayedPeriod !== timePeriodsForDisplay.month) {
			displayedPeriod = timePeriodsForDisplay.month;
			calendarGridContainer.classList.remove(invisibilityModifier);
		}
		const date = new Date(currentYear, currentMonth);
		date.setMonth(currentMonth - 1);
		currentMonth = date.getMonth();
		currentYear = date.getFullYear();
		updateCalendarVariables(currentYear, currentMonth);
		daysListContainer.innerHTML = '';
		renderDays(daysListContainer, daysElementsArr);
		renderCurrentYear(currentYear);
		renderCurrentMonth(currentMonth);
		renderCurrentPeriod('');
	});

	// Переключение месяца на следующий
	nextMonthBtnElement.addEventListener('mouseup', (e) => {
		// если отображаемый период был установлен не на "месяц", то переключаем на "месяц" и показываем сетку календаря
		if (displayedPeriod !== timePeriodsForDisplay.month) {
			displayedPeriod = timePeriodsForDisplay.month;
			calendarGridContainer.classList.remove(invisibilityModifier);
		}
		const date = new Date(currentYear, currentMonth);
		date.setMonth(currentMonth + 1);
		currentMonth = date.getMonth();
		currentYear = date.getFullYear();
		updateCalendarVariables(currentYear, currentMonth);
		daysListContainer.innerHTML = '';
		renderDays(daysListContainer, daysElementsArr);
		renderCurrentYear(currentYear);
		renderCurrentMonth(currentMonth);
		renderCurrentPeriod('');
	});

	// Переключение отображаемого периода (кнопка "Месяц/Неделя")
	changePeriodBtnElement.addEventListener('mouseup', (e) => {
		// меняем значение глобальной переменной отображаемого периода в зависимости от её текущего значения
		// был месяц - станет неделя
		if (displayedPeriod === timePeriodsForDisplay.month) {
			displayedPeriod = timePeriodsForDisplay.week;
			// убираем сетку календаря
			calendarGridContainer.classList.add(invisibilityModifier);
		}
		// был день или неделя - станет месяц
		else if (
			displayedPeriod === timePeriodsForDisplay.week ||
			displayedPeriod === timePeriodsForDisplay.day
		) {
			displayedPeriod = timePeriodsForDisplay.month;
			// показываем сетку календаря
			calendarGridContainer.classList.remove(invisibilityModifier);
		}
		// приводим все глобальные переменные, используемые для отрисовки календаря, в значения, соответствующие актуальной (сегодняшней) дате
		currentYear = new Date().getFullYear();
		currentMonth = new Date().getMonth();
		updateCalendarVariables(currentYear, currentMonth);
		// заново рендерим элементы при новом значении переменных
		daysListContainer.innerHTML = '';
		renderDays(daysListContainer, daysElementsArr);
		renderCurrentYear(currentYear);
		renderCurrentMonth(currentMonth);
		renderCurrentPeriod(displayedPeriod);
		renderChangePeriodBtnTextContent(displayedPeriod);
	});

	// Переключение отображаемого периода (кнопка "Сегодня")
	todayBtnElement.addEventListener('mouseup', (e) => {
		// меняем значение глобальной переменной отображаемого периода на текущий день
		if (displayedPeriod !== timePeriodsForDisplay.day) {
			displayedPeriod = timePeriodsForDisplay.day;
			// убираем сетку календаря
			calendarGridContainer.classList.add(invisibilityModifier);
		}
		// приводим все глобальные переменные, используемые для отрисовки календаря, в значения, соответствующие актуальной (сегодняшней) дате
		currentYear = new Date().getFullYear();
		currentMonth = new Date().getMonth();
		updateCalendarVariables(currentYear, currentMonth);
		// заново рендерим элементы при новом значении переменных
		renderCurrentYear(currentYear);
		renderCurrentMonth(currentMonth);
		renderCurrentPeriod(displayedPeriod);
		renderChangePeriodBtnTextContent(displayedPeriod);
	});
};

// Выбираем контейнер календаря
const calendarContainer = document.querySelector(calendarContainerSelector);
// Запускаем логику календаря
initCalendar(calendarContainer);
