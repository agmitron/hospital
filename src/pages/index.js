import './index.css';
import { calendarContainerSelector } from '../utils/constants.js';
import { initCalendar } from '../plugins/calendar/index.js';
import { initMap } from '../plugins/map/map.js';

import EventPopup from '../utils/EventPopup.js';
import Event from '../utils/Event.js';
import MapPopup from '../utils/MapPopup.js';

import { mapCenterCoords } from '../utils/constants.js';

const events = [
	{
		title: 'Сортировка',
		icons: ['medkit', 'aids', 'food'],
		metro: 'м. Обухово',
		hours: '10:00–17:00',
		address: 'Невский проспект 1, Санкт-Петербург',
		date: 'Понедельник 11 апреля',
	},
	{
		title: 'Ночной приют',
		icons: ['shower', 'sleep', 'covid'],
		metro: 'м. Ломоносовская',
		hours: '18:00–23:00',
		address: 'Европейский проспект 8, Кудрово',
		date: 'Вторник 12 апреля',
	},
	{
		title: 'Заголовок 3',
		icons: ['clothdry', 'vaccine', 'shower', 'haircut'],
		metro: 'м. Обухово',
		hours: '23:00–09:00',
		address: 'Шувалова 22, корп 3, Мурино',
		date: 'Среда 13 апреля',
	},
];

// Создаем экземпляр попапа карты
const mapPopup = new MapPopup('.map-popup', () => initMap(mapCenterCoords, eventPopup.currentEvent.address));

// Создаем экземпляр попапа события
const eventPopup = new EventPopup('.event-popup', () => mapPopup.open(eventPopup.currentEvent));

// Секция с ивентами
const eventsElement = document.querySelector('.events');

// Создаем экземпляр попапа события
const eventPopup = new EventPopup('.event-popup', () => eventsElement.classList.remove('hidden'));

// Создаем экземпляр тултипа
const tooltip = new Tooltip('.tooltip');

const eventTemplateSelector = '.event-template';

events.forEach((event) => eventsElement.append(new Event(eventTemplateSelector, event, () => eventPopup.open(event))));

// Запускаем календарь
initCalendar(calendarContainerSelector);
