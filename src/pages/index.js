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

function makeDateObj(dateString) {
	const [day, month, year] = dateString.split('.');
	return new Date(year, month - 1, day);
}

function makeSideDate(dateString) {
	const date = makeDateObj(dateString);
	return date
		.toLocaleString('ru', { weekday: 'short', day: 'numeric' })
		.toUpperCase()
		.replace(',', '');
}

function isToday(dateString) {
	const date = makeDateObj(dateString);
	const today = new Date();
	return date.toLocaleDateString() === today.toLocaleDateString();
}

function renderEvents(events) {
	eventPopup.close();
	eventsElement.innerHTML = '';
	let currentDate = '';
	let wrapperElement = null;
	events.forEach(event => {
		console.log(event);
		if (currentDate !== event.date) {
			const eventsDayElement = document.querySelector('.events-template').content.cloneNode(true).querySelector('.events');
			const titleElement = eventsDayElement.querySelector('.events__title');
			wrapperElement = eventsDayElement.querySelector('.events__container');
			titleElement.textContent = makeSideDate(event.date);
			if (isToday(event.date)) titleElement.classList.add('events__title_selected');
			eventsElement.append(eventsDayElement);
			currentDate = event.date;
		}
		wrapperElement.append(new Event(eventTemplateSelector, event, () => eventPopup.open(event)))
	});
}

gsheets(options).then(data => {
	initCalendar(calendarContainerSelector, renderEvents, data);
});

