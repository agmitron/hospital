import { eventTemplate, noEventTemplate, cancelledTemplate, icons } from "./EventConstants";
export default class Event {
  constructor({ prefix = 'calendar', eventData = {} }) {
    const element = document.createElement('div');
    this._prefix = prefix;
    element.innerHTML =
      eventData.isCancelled ? cancelledTemplate.replaceAll('~~PREFIX~~', prefix) :
        (eventData.title
          ? eventTemplate.replaceAll('~~PREFIX~~', prefix)
          : noEventTemplate.replaceAll('~~PREFIX~~', prefix));
    this._element = element.firstChild;
    //    this._eventData = eventData;
    //    console.log(this._element);
    if (eventData.title && !eventData.isCancelled) {
      this._title = this._element.querySelector(`.${prefix}-event__title`);
      this._hours = this._element.querySelector(`.${prefix}-event__hours`);
      this._metro = this._element.querySelector(`.${prefix}-event__metro`);
      this._address = this._element.querySelector(`.${prefix}-event__address`);
      this._switches = this._element.querySelectorAll(`.${prefix}-event__switch`) || [];
      this._sections = this._element.querySelectorAll(`.${prefix}-section`);
      this._serviceSection = this._element.querySelector(`.${prefix}-section_type_services`);
      this._fillFields(eventData);
      this._fillServices(eventData);
      this._enableSwitches();
    }
    return this._element;
  }

  _capitalizeFirstLetter(str) {
    return str && str[0].toUpperCase() + str.slice(1);
  }

  _createOneService(serviceData) {
    //    console.log(serviceData.activities);
    //    console.log(icons['тест на covid']);
    const activities = serviceData.activities
      .reduce((acc, item) => (acc +
        `<li class="${this._prefix}-event__activity ${icons[item.toLowerCase()] ? 'calendar-event__activity_icon_'
          + icons[item.toLowerCase()] : ''}">${this._capitalizeFirstLetter(item)}</li>`), '');
    const service = `<div class="${this._prefix}-event__service">
      <h5 class="${this._prefix}-event__hours">График помощи: ${serviceData.hours}</h5>
      <ul class="${this._prefix}-event__activities">${activities}</ul>
    </div>`;

    const serviceElement = document.createElement('div');
    serviceElement.classList.add(`${this._prefix}-event__service`);
    serviceElement.innerHTML = service;
    return serviceElement;
  }

  _fillServices({ services }) {
    services.forEach(service => this._serviceSection.append(this._createOneService(service)));
  }

  _composeHours(eventData) {
    const convertTime = (time) => time.slice(0, 2) * 100 + +time.slice(3);
    let beginMax = '23:59';
    let endMax = '00:00';
    for (let item of eventData.services) {
      const [begin, end] = item.hours.split('-');
      if (convertTime(begin) < convertTime(beginMax)) beginMax = begin;
      if (convertTime(end) > convertTime(endMax)) endMax = end;
    }
    return `${beginMax}-${endMax}`;
  }

  _fillFields(eventData) {
    //    console.log(eventData);
    this._title.textContent = eventData.title;
    this._metro.textContent = eventData.metro;
    this._address.textContent = eventData.address;
    this._hours.textContent = `Часы работы: ${this._composeHours(eventData)}`;
  }

  _enableSwitches() {
    this._switches.forEach(element => {
      element.removeEventListener('click', this._handleSwitch);
      if (!element.classList.contains(`${this._prefix}-event__switch_active`))
        element.addEventListener('click', this._handleSwitch);
    });
  }

  _handleSwitch = ({ target }) => {
    const targetSection = target.dataset.section;
    this._sections.forEach(section =>
    (section.classList.contains(`${this._prefix}-section_type_${targetSection}`) ?
      section.classList.remove(`${this._prefix}-hidden`)
      : section.classList.add(`${this._prefix}-hidden`)
    )
    );
    this._switches.forEach(button => (button.dataset.section === targetSection
      ? button.classList.add(`${this._prefix}-event__switch_active`)
      : button.classList.remove(`${this._prefix}-event__switch_active`)));
    this._enableSwitches();
  }
}