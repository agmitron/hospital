const eventTemplate = `
<div class="~~PREFIX~~-event">
  <h4 class="~~PREFIX~~-event__title"></h4>
  <section class="~~PREFIX~~-event__section-address">
    <h5 class="~~PREFIX~~-event__hours"></h5>
    <p class="~~PREFIX~~-event__metro"></p>
    <p class="~~PREFIX~~-event__address"></p>
  </section>
  <section class="~~PREFIX~~-event__section-services">
  </section>
  <div class="~~PREFIX~~-event__switches">
    <button type="button" class="~~PREFIX~~-event__switch ~~PREFIX~~-event__switch_active">Адрес</button>
    <button type="button" class="~~PREFIX~~-event__switch">Сервисы</button>
  </div>
</div>`;

const serviceTemplate = `
  <p class="~~PREFIX~~-event__hours"></p>
 
`

export default class Event {
  constructor({ prefix = 'calendar', eventData = {} }) {
    const element = document.createElement('div');
    element.innerHTML = eventTemplate.replace('~~PREFIX~~', prefix);
    this._element = element.firstChild();
    this._prefix = prefix;
    this._eventData = eventData;
    this._title = this._element.querySelector(`${prefix}-event__title`);
    this._hours = this._element.querySelector(`${prefix}-event__hours`);
    this._metro = this._element.querySelector(`${prefix}-event__metro`);
    this._address = this._element.querySelector(`${prefix}-event__address`);
    this._switches = this._element.querySelectorAll(`${prefix}-event__switch`) || [];
    this._addListeners();
    return this._element;
  }

  _addListeners() {
    this._switches.forEach(element => {
      if (!element.classList.contains(`${this._prefix}-event__switch_active`))
        element.addEventListener('click', this._handleSwitch);
    });
  }

  _handleSwitch(evt) {

  }
}