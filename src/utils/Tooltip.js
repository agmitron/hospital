class Tooltip {
    constructor(selector) {
        this._element = document.querySelector(selector);
        this._text = this._element.querySelector('.calendar-tooltip__text');
    }

    show = (text, evt) => {
        const icon = evt.target;
        this._text.textContent = text;

        this._element.style.top = `${icon.offsetTop - 40}px`;
        const middle = this._element.offsetWidth / 2;
        const left = icon.offsetLeft - middle;
        this._element.style.left = `${left}px`;
        this._element.classList.remove('calendar-hidden');
    }

    hide = () => {
        this._text.textContent = '';
        this._element.classList.add('calendar-hidden');

    }
}

export default Tooltip;