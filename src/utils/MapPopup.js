export default class MapPopup {
	constructor(selector, markerData) {
		this._popupOpenedClass = 'map-popup_opened';
		this._element = document.querySelector(selector);
		this._closeButton = this._element.querySelector('.map-popup__close-button');
		this._markerData = markerData;
		return this;
	}

	open({ title = '', address = '', icons = [], metro = '', hours, date } = {}) {
		this._element.classList.add(this._popupOpenedClass);
		this._title.textContent = title;
		this._address.textContent = address;
		this._metro.textContent = metro;
		this._date.textContent = date;
		this._hours.textContent = hours;
		this._activities.innerHTML = '';
		icons.forEach((icon) =>
			this._activities.append(this._createActivity(icon, iconTexts[icon]))
		);
		this._setEventListeners();
	}

	close() {
		this._element.classList.remove(this._popupOpenedClass);
		this._removeEventListeners();
	}

	isOpened() {
		return this._element.classList.contains(this._popupOpenedClass);
	}

	_createActivity(icon, text) {
		const element = document.createElement('li');
		element.classList.add('event-popup__activity');
		const iconElement = document.createElement('div');
		iconElement.className = `icon icon_type_${icon}`;
		element.textContent = text;
		element.append(iconElement);
		return element;
	}

	_handleCloseButton = () => {
		this.close();
	};

	_handleEscClose = (evt) => {
		if (evt.key === 'Escape') this.close();
	};

	_setEventListeners() {
		this._closeButton.addEventListener('click', this._handleCloseButton);
		document.addEventListener('keydown', this._handleEscClose);
	}

	_removeEventListeners() {
		document.removeEventListener('keydown', this._handleEscClose);
		this._closeButton.removeEventListener('click', this._handleCloseButton);
	}
}
