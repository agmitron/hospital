import './index.css';
import { calendarContainerSelector } from '../utils/constants.js';
import { initCalendar } from '../plugins/calendar/index.js';
import { gsheets } from '../api/gsheets';

import EventPopup from '../utils/EventPopup.js';
import Event from '../utils/Event.js';

const options = {
	apiKey: 'AIzaSyAozRsHSFgLEZkH-Du-a2r4K1CsXPLjj2o',
	sheetId: '1j9Ln-t7BoitA7fzeFp20tVq68h0KYO6x3PHjic4jqMA',
	sheetName: 'Лист1',
}

// Создаем экземпляр попапа события
const eventPopup = new EventPopup('.event-popup');

// events.forEach((event) =>
// 	eventsElement.append(
// 		new Event(eventTemplateSelector, event, () => eventPopup.open(event))
// 	)
// );

const eventTemplateSelector = '.event-template';

// Секция с ивентами
const eventsElement = document.querySelector('.events');

function makeDateSearchString(date) {
	return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
}

// async function getEventsByDate(events) {
// 	//	console.log(date, makeDateSearchString(date));
// 	const dateString = makeDateSearchString(date);
// 	const filterOptions = {
// 		...options,
// 		filter: {
// 			'date': dateString,
// 		},
// 	};
// 	//	console.log(filterOptions);
// 	const events = await gsheets(filterOptions);
// 	renderEvents(events);
// }

function renderEvents(events) {
	console.log(events);
	eventPopup.close();
	eventsElement.innerHTML = '';
	events.forEach(event => eventsElement.append(new Event(eventTemplateSelector, event, () => eventPopup.open(event))));
}

gsheets(options).then(data => {
	console.log(data);
	initCalendar(calendarContainerSelector, renderEvents, data);
});

// async function getEvents(results) {
// 	results.forEach(event => eventsElement.append(new Event(eventTemplateSelector, event, () => eventPopup.open(event))));
// }

//GSheetReader(options, getEvents);
