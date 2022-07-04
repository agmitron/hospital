export default class Event {
    constructor(templateSelector, event, onClick) {
        this._element = this._createElement(templateSelector);
        this._title = this._element.querySelector('.event__title');
        this._icons = this._element.querySelector('.event__icons');
        this._metro = this._element.querySelector('.event__metro');
        this._hours = this._element.querySelector('.event__hours');
        this._address = this._element.querySelector('.event__address');
        this._fillElement(event);
        this._addEventListeners(onClick);
        return this._element;
    }

    _createElement = (selector) => document.querySelector(selector).content.querySelector('.event').cloneNode(true);

    _createLi({ className = '', text = '' }) {
        const liElement = document.createElement('li');
        liElement.className = className;
        liElement.textContent = text;
        return liElement;
    }

    _fillElement({ title, icons = [], metro, address, hours }) {
        this._title.textContent = title;
        icons.forEach(icon => this._icons.append(this._createLi({ className: `icon icon_type_${icon}` })));
        this._metro.textContent = metro;
        this._hours.textContent = hours;
        this._address.textContent = address;
    }

    _addEventListeners(onClick) {
        onClick && this._element.addEventListener('click', onClick);
    }

}