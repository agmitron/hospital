export default class eventPopup {
    constructor({ selectors: { popup, closeButton }, classNames: { popupOpened } }) {
        this._popupOpenedClass = popupOpened;
        this._element = document.querySelector(popup);
        this._closeButton = this._element.querySelector(closeButton);
    }

    open() {
        this._element.classList.add(this._popupOpenedClass);
        this._setEventListeners();
    }

    close() {
        this._element.classList.remove(this._popupOpenedClass);
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

