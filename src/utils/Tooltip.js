class Tooltip {
    constructor(selector) {
        this._element = document.querySelector(selector);
        this._text = this._element.querySelector('.tooltip__text');
    }

    show = (text, evt) => {
        this._text.textContent = text;
        this._element.style.top = `${evt.clientY + 5}px`;
        this._element.style.left = `${evt.clientX + 5}px`;
        this._element.classList.remove('hidden');
    }

    hide = () => {
        this._text.textContent = '';
        this._element.classList.add('hidden');

    }
}

export default Tooltip;