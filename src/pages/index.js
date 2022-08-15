import './index.css';
import { calendarContainerSelector } from '../utils/constants.js';
import { initCalendar } from '../plugins/calendar/index.js';
import { initMap } from '../plugins/map/map.js';
import { gsheets } from '../api/gsheets';
import { makeSideDate, isToday, makeTitleDate } from '../utils/dateUtils';
import { iconTexts } from '../utils/constants.js';

import EventPopup from '../utils/EventPopup.js';
import Event from '../utils/Event.js';
import MapPopup from '../utils/MapPopup.js';

import { mapCenterCoords } from '../utils/constants.js';
import Tooltip from '../utils/Tooltip';

const options = {
	apiKey: 'AIzaSyAozRsHSFgLEZkH-Du-a2r4K1CsXPLjj2o',
	sheetId: '1j9Ln-t7BoitA7fzeFp20tVq68h0KYO6x3PHjic4jqMA',
	sheetName: 'Лист1',
}

// Секция с ивентами
const eventsElement = document.querySelector('.events');

// Создаем экземпляр попапа карты
const mapPopup = new MapPopup('.map-popup', () => initMap(mapCenterCoords, eventPopup.currentEvent.address));

// Создаем экземпляр попапа события
const eventPopup = new EventPopup('.event-popup', {onClose: () => eventsElement.classList.remove('hidden'), onMapOpen: () => mapPopup.open(eventPopup.currentEvent)});

// Создаем экземпляр тултипа
const tooltip = new Tooltip('.tooltip');

const eventTemplateSelector = '.event-template';

function handleEventClick(event) {
	if (eventsElement.clientWidth > 425) return;
	eventsElement.classList.add('hidden');
	eventPopup.open(event);
}

function showTooltip(type, evt) {
	tooltip.show(iconTexts[type], evt);
}

function renderEvents(events, period = 'month') {
	eventPopup.close();
	const titleStyle = period === 'month' && eventsElement.clientWidth > 425 ? 'full' : 'brief';
	eventsElement.innerHTML = '';
	let currentDate = '';
	let wrapperElement = null;
	events.forEach(event => {
		if (currentDate !== event.date) {
			const eventsDayElement = document.querySelector('.events-template').content.cloneNode(true).querySelector('.events');
			const titleElement = eventsDayElement.querySelector('.events__title');
			wrapperElement = eventsDayElement.querySelector('.events__container');
			console.log(period, titleStyle);
			titleElement.textContent = titleStyle === 'brief' ? makeSideDate(event.date) : makeTitleDate(event.date);
			if (titleStyle === 'brief') {
				eventsDayElement.classList.add('events_title_sideway');
				titleElement.classList.add('events__title_brief');
			}
			if (isToday(event.date)) titleElement.classList.add('events__title_selected');
			eventsElement.append(eventsDayElement);
			currentDate = event.date;
		}
		wrapperElement.append(
			new Event({
				templateSelector: eventTemplateSelector,
				event,
				onClick: () => handleEventClick(event),
				onMouseOver: showTooltip,
				onMouseOut: tooltip.hide,
			}))
	});
}

gsheets(options).then(data => {
	initCalendar(calendarContainerSelector, renderEvents, data);
});

