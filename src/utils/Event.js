export default class Event {
    constructor({ templateSelector, event, onClick, onMouseOver, onMouseOut }) {
        this._element = this._createElement(templateSelector);
        this._title = this._element.querySelector('.calendar-event__title');
        this._icons = this._element.querySelector('.calendar-event__icons');
        this._metro = this._element.querySelector('.calendar-event__metro');
        this._hours = this._element.querySelector('.calendar-event__hours');
        this._address = this._element.querySelector('.calendar-event__address');
        this._onMouseOver = onMouseOver;
        this._onMouseOut = onMouseOut;
        this._onClick = onClick;
        this._fillElement(event);
        this._addEventListeners();
        //        console.log(this._element);
        return this._element;
    }

    _createElement = (selector) => document.querySelector(selector).content.querySelector('.calendar-event').cloneNode(true);

    _createIcon({ className = '', type = '' }) {
        const icon = document.createElement('li');
        icon.className = className;
        this._onMouseOver && icon.addEventListener('mouseenter', (evt) => this._onMouseOver(type, evt));
        this._onMouseOut && icon.addEventListener('mouseleave', this._onMouseOut);
        return icon;
    }

    _fillElement({ title = '', activities = '', metro, address, hours }) {
        this._title.textContent = title;
        console.log(this._title.textContent);
        activities.split(' ').filter(x => x)
            .forEach(icon => this._icons.append(this._createIcon({ type: icon, className: `calendar-icon calendar-icon_type_${icon}` })));
        this._metro.textContent = metro;
        this._hours.textContent = `Часы работы: ${hours}`;
        this._address.textContent = address;
    }

    _addEventListeners() {
        console.log('listeners');
        this._onClick && this._element.addEventListener('click', this._onClick);
    }

}