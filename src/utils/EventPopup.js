import { iconTexts } from "./constants";
export default class EventPopup {
	constructor(selector, {onClose, onMapOpen, isMapOpened}) {
		this._popupOpenedClass = 'calendar-event-popup_opened';
		this._element = document.querySelector(selector);
		this._closeButton = this._element.querySelector('.calendar-icon_type_close');
		this._shareButton = this._element.querySelector('.calendar-icon_type_share');
		this._howToReachButton = this._element.querySelector('.calendar-event-popup__button_red');
		this._title = this._element.querySelector('.calendar-event-popup__title');
		this._address = this._element.querySelector('.calendar-event-popup__text_address');
		this._metro = this._element.querySelector('.calendar-event-popup__text_metro');
		this._date = this._element.querySelector('.calendar-event-popup__text_date');
		this._hours = this._element.querySelector('.calendar-event-popup__text_hours');
		this._activities = this._element.querySelector('.calendar-event-popup__activities');
		this.currentEvent = '';
		this._openMapPopup = onMapOpen;
		this._onClose = onClose;
		this._isMapOpened = isMapOpened;


		return this;
	}

    open({ title = '', address = '', activities = '', metro = '', hours, date } = {}) {
        this._element.classList.add(this._popupOpenedClass);
        this._title.textContent = title;
        this._address.textContent = address;
        this._metro.textContent = metro;
        this._date.textContent = this._convertDate(date);
        this._hours.textContent = hours;
        this._activities.innerHTML = '';
				this.currentEvent = { title, address, activities, metro, hours, date };
        activities.split(' ').filter(x => x).forEach(icon => this._activities.append(this._createActivity(icon, iconTexts[icon])));
        this._setEventListeners();
    }

    close() {
        this._element.classList.remove(this._popupOpenedClass);
        this._removeEventListeners();
        this._onClose && this._onClose();
    }

	isOpened() {
		return this._element.classList.contains(this._popupOpenedClass);
	}

    _convertDate(dateString) {
        const [day, month, year] = dateString.split('.');
        const date = new Date(year, month - 1, day);
        const localDate = date.toLocaleString('ru', { weekday: 'long', day: 'numeric', month: 'long' });
        return localDate[0].toUpperCase() + localDate.slice(1).replace(',', '');
    }

    _createActivity(icon, text) {
        const element = document.createElement('li');
        element.classList.add('calendar-event-popup__activity');
        const iconElement = document.createElement('div');
        iconElement.className = `calendar-icon calendar-icon_type_${icon}`;
        element.textContent = text;
        element.append(iconElement);
        return element;
    }

	_handleCloseButton = () => {
		this.close();
	};

	_handleEscClose = (evt) => {
		if (evt.key === 'Escape' && !this._isMapOpened()) this.close();
	};

	_handleShareButton = async () => {
		try {
      await navigator.share({
        text: `${this.currentEvent.title}, ${this.currentEvent.date}, ${this.currentEvent.hours}, ${this.currentEvent.address}, ${this.currentEvent.metro}, ${this.currentEvent.activities}`,
        title: 'Мобильная клиника',
        url: document.location.href,
      });
    } catch (err) {
      alert(`Ошибка: ${err}`);
    }
  };

	_setEventListeners() {
		this._closeButton.addEventListener('click', this._handleCloseButton);
		document.addEventListener('keydown', this._handleEscClose);
		this._howToReachButton.addEventListener('click', this._openMapPopup);
		this._shareButton.addEventListener('click', this._handleShareButton);
	}

	_removeEventListeners() {
		document.removeEventListener('keydown', this._handleEscClose);
		this._closeButton.removeEventListener('click', this._handleCloseButton);
		this._howToReachButton.removeEventListener('click', this._openMapPopup);
		this._shareButton.removeEventListener('click', this._handleShareButton);
	}
}

