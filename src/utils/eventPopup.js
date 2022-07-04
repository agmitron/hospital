export default class EventPopup {
    constructor(selector) {
        this._popupOpenedClass = 'event-popup_opened';
        this._element = document.querySelector(selector);
        this._closeButton = this._element.querySelector('.icon_type_close');
        this._title = this._element.querySelector('.event-popup__title');
        this._address = this._element.querySelector('.event-popup__text_address');

        return this;
    }

    open({title = '', address = '', icons = []} = {}) {
        this._element.classList.add('event-popup_opened');
        this._title.textContent = title;
        this._address.textContent = address;
        this._setEventListeners();
    }

    close() {
        this._element.classList.remove('event-popup_opened');
        this._removeEventListeners();
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

