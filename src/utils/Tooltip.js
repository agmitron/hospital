class Tooltip {
    constructor(selector) {
        this._element = document.querySelector(selector);
        this._text = this._element.querySelector('.calendar-tooltip__text');
    }

    show = (text, evt) => {
        this._text.textContent = text;
        //        debugger;
        this._element.style.top = `${evt.clientY - 35}px`;
        this._element.style.left = `${evt.clientX - 30}px`;
        this._element.classList.remove('calendar-hidden');
    }

    hide = () => {
        this._text.textContent = '';
        this._element.classList.add('calendar-hidden');

    }
}

export default Tooltip;