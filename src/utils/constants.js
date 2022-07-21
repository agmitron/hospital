// Селектор контейнера календаря
const calendarContainerSelector = '.calendar';
// Селектор контейнера, в который динамически вставляется сетка календарных дней (чисел календаря)
const daysListContainerSelector = '.calendar-grid__days-list';
// Селектор элемента шаблона карточки календарного дня
const dayTemplateSelector = '.calendar-day-template';
// Селектор элемента карточки календарного дня
const dayElementSelector = '.calendar-day';
// Селектор кнопки переключения месяца на предыдущий
const prevMonthBtnSelector = '.calendar-header__change-month-btn';
// Селектор кнопки переключения месяца на предыдущий
const nextMonthBtnSelector = '.calendar-header__change-month-btn_type_next';
// Селекторы элементов с текущим годом
const currentYearElementSelector = '.calendar-header__year-row';
const currentYearElementSelectorForMobile = '.calendar-header__year-for-mobile';
// Селектор элемента с текущим месяцем
const currentMonthElementSelector = '.calendar-header__month';
// Селектор элемента, отображающего выбранный период времени
const currentPeriodElementSelector = '.calendar-header__selected-period-row';
// Селектор кнопки смены отображаемого периода (месяц/неделя)
const changePeriodBtnSelector = '.calendar-header__period-btn';
// Селектор кнопки "Сегодня"
const todayBtnSelector = '.calendar-header__today-btn';
// Селектор контейнера сетки календаря
const calendarGridContainerSelector = '.calendar-grid';
// Модификатор стиля для скрытия сетки календаря
const invisibilityModifier = 'calendar-grid_invisible';

// Массив названий месяцев
const monthsArr = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];
// Отображаемые периоды времени
const timePeriodsForDisplay = { day: 'day', week: 'week', month: 'month' };

export {
	calendarContainerSelector,
	daysListContainerSelector,
	dayTemplateSelector,
	dayElementSelector,
	prevMonthBtnSelector,
	nextMonthBtnSelector,
	currentYearElementSelector,
	currentMonthElementSelector,
	monthsArr,
	currentYearElementSelectorForMobile,
	timePeriodsForDisplay,
	currentPeriodElementSelector,
	changePeriodBtnSelector,
	calendarGridContainerSelector,
	todayBtnSelector,
	invisibilityModifier,
};
