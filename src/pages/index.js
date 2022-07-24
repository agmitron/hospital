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

// Секция с ивентами
const eventsElement = document.querySelector('.events');

// Создаем экземпляр попапа события
const eventPopup = new EventPopup('.event-popup', () => eventsElement.classList.remove('hidden'));

// events.forEach((event) =>
// 	eventsElement.append(
// 		new Event(eventTemplateSelector, event, () => eventPopup.open(event))
// 	)
// );

const eventTemplateSelector = '.event-template';

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

function handleEventClick(event) {
	console.log(window.innerHeight, eventsElement.clientWidth);
	if (eventsElement.clientWidth > 425) return;
	eventsElement.classList.add('hidden');
	eventPopup.open(event);
}

function renderEvents(events, period) {
	eventPopup.close();
	eventsElement.innerHTML = '';
	let currentDate = '';
	let wrapperElement = null;
	console.log(period);
	events.forEach(event => {
		//		console.log(event);
		if (currentDate !== event.date) {
			const eventsDayElement = document.querySelector('.events-template').content.cloneNode(true).querySelector('.events');
			const titleElement = eventsDayElement.querySelector('.events__title');
			wrapperElement = eventsDayElement.querySelector('.events__container');
			titleElement.textContent = makeSideDate(event.date);
			if (isToday(event.date)) titleElement.classList.add('events__title_selected');
			eventsElement.append(eventsDayElement);
			currentDate = event.date;
		}
		wrapperElement.append(new Event(eventTemplateSelector, event, () => handleEventClick(event)))
	});
}

gsheets(options).then(data => {
	initCalendar(calendarContainerSelector, renderEvents, data);
});

