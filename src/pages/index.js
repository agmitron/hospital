import './index.css';
import { calendarContainerSelector } from '../utils/constants.js';
import { initCalendar } from '../plugins/calendar/index.js';
import GSheetReader from 'g-sheets-api';

import EventPopup from '../utils/EventPopup.js';
import Event from '../utils/Event.js';

const options = {
	apiKey: 'AIzaSyAozRsHSFgLEZkH-Du-a2r4K1CsXPLjj2o',
	sheetId: '1j9Ln-t7BoitA7fzeFp20tVq68h0KYO6x3PHjic4jqMA',
	sheetName: 'Лист1',
	returnAllResults: false,
}

// Создаем экземпляр попапа события
const eventPopup = new EventPopup('.event-popup');

// events.forEach((event) =>
// 	eventsElement.append(
// 		new Event(eventTemplateSelector, event, () => eventPopup.open(event))
// 	)
// );

initCalendar(calendarContainerSelector, getEventsByDate);

const eventTemplateSelector = '.event-template';

// Секция с ивентами
const eventsElement = document.querySelector('.events');

function makeDateSearchString(date) {
	return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
}

function getEventsByDate(date) {
//	console.log(date, makeDateSearchString(date));
	eventPopup.close();
	eventsElement.innerHTML = '';
	const dateString = makeDateSearchString(date);
	const filterOptions = {
		...options,
		filter: {
			'date': dateString,
		},
	};
//	console.log(filterOptions);
	GSheetReader(filterOptions, renderEvents)
}

function renderEvents(events) {
//	console.log(events);
	events.forEach(event => eventsElement.append(new Event(eventTemplateSelector, event, () => eventPopup.open(event))));
}

// async function getEvents(results) {
// 	results.forEach(event => eventsElement.append(new Event(eventTemplateSelector, event, () => eventPopup.open(event))));
// }

//GSheetReader(options, getEvents);
