import { calendarContainerSelector } from '../utils/constants.js';
import { initCalendar } from '../plugins/calendar/index.js';

import EventPopup from '../utils/EventPopup.js';
import Event from '../utils/Event.js';

const events = [
	{
		title: 'Сортировка',
		icons: ['medkit', 'aids', 'food'],
		metro: 'м. Обухово',
		hours: '10:00–17:00',
		address: 'Агатов переулок 37, корп 4, Санкт-Петербург',
		date: 'Понедельник 11 апреля',
	},
	{
		title: 'Ночной приют',
		icons: ['shower', 'sleep', 'covid'],
		metro: 'м. Ломоносовская',
		hours: '18:00–23:00',
		address: 'Богатов переулок 148, корп 2, Санкт-Петербург',
		date: 'Вторник 12 апреля',
	},
	{
		title: 'Заголовок 3',
		icons: ['clothdry', 'vaccine', 'shower', 'haircut'],
		metro: 'м. Обухово',
		hours: '23:00–09:00',
		address: 'Маратов переулок 1, корп 1, Санкт-Петербург',
		date: 'Среда 13 апреля',
	},
];

// Создаем экземпляр попапа события
const eventPopup = new EventPopup('.event-popup');

// Секция с ивентами
const eventsElement = document.querySelector('.events');

const eventTemplateSelector = '.event-template';

events.forEach((event) =>
	eventsElement.append(
		new Event(eventTemplateSelector, event, () => eventPopup.open(event))
	)
);

initCalendar(calendarContainerSelector);
