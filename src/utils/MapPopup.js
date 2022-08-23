export default class MapPopup {
	constructor(selector, addPlaceMarker) {
		this._popupOpenedClass = 'calendar-map-popup_opened';
		this._element = document.querySelector(selector);
		this._closeButton = this._element.querySelector('.calendar-map-popup__close-button');
		this._addPlaceMarker = addPlaceMarker;
	}

	open() {
		this._addPlaceMarker();
		this._setEventListeners();
		this._element.classList.add(this._popupOpenedClass);
	}

	close() {
		this._element.classList.remove(this._popupOpenedClass);
		this._removeEventListeners();
	}

	isOpened() {
		return this._element.classList.contains(this._popupOpenedClass);
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
