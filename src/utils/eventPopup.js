const iconTexts = {
    food: 'Еда',
    shower: 'Душ',
    medkit: 'Медицинская помощь',
    clothdry: 'Сушка одежды',
    clothwash: 'Стирка',
    sleep: 'Ночлег',
    help: 'Социальная помощь',
    warm: 'Обогрев',
    health: 'Средства гигиены',
    eyes: 'Офтальмология',
    vaccine: 'Вакцинация',
    aids: 'ВИЧ',
    covid: 'Covid',
    haircut: 'Стрижка',
};

export default class EventPopup {
    constructor(selector) {
        this._popupOpenedClass = 'event-popup_opened';
        this._element = document.querySelector(selector);
        this._closeButton = this._element.querySelector('.icon_type_close');
        this._title = this._element.querySelector('.event-popup__title');
        this._address = this._element.querySelector('.event-popup__text_address');
        this._metro = this._element.querySelector('.event-popup__text_metro');
        this._date = this._element.querySelector('.event-popup__text_date');
        this._hours = this._element.querySelector('.event-popup__text_hours');
        this._activities = this._element.querySelector('.event-popup__activities');
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
        activities.split(' ').filter(x => x).forEach(icon => this._activities.append(this._createActivity(icon, iconTexts[icon])));
        this._setEventListeners();
    }

    close() {
        this._element.classList.remove(this._popupOpenedClass);
        this._removeEventListeners();
    }

    isOpened() {
        return this._element.classList.contains(this._popupOpenedClass);
    }

    _convertDate(dateString) {
        const [day, month, year] = dateString.split('.');
        const date = new Date(year, month - 1, day);
        const localDate = date.toLocaleString('ru', { weekday: 'long', day: 'numeric', month: 'long' });
        console.log(localDate);
        return localDate[0].toUpperCase() + localDate.slice(1).replace(',', '');
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
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") this.close();
    }

    _setEventListeners() {
        this._closeButton.addEventListener('click', this._handleCloseButton);
        document.addEventListener("keydown", this._handleEscClose);
    }

    _removeEventListeners() {
        document.removeEventListener("keydown", this._handleEscClose);
        this._closeButton.removeEventListener('click', this._handleCloseButton);
    }

}

