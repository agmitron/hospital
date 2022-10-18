const NO_EVENT_TITLE = 'Нет выезда';
const NO_EVENT_SUBTITLE = 'На данную дату выезд не запланирован';
const NO_EVENT_TEXT = 'Уточнить дату выезда можно по телефону:';
const NO_EVENT_PHONE = '+7-952-230-03-49';

const eventTemplate = `<div class="~~PREFIX~~-event">
  <h4 class="~~PREFIX~~-event__title"></h4>
  <section class="~~PREFIX~~-section_type_address ~~PREFIX~~-section">
    <h5 class="~~PREFIX~~-event__hours"></h5>
    <p class="~~PREFIX~~-event__metro"></p>
    <p class="~~PREFIX~~-event__address"></p>
  </section>
  <section class="~~PREFIX~~-section_type_services ~~PREFIX~~-section ~~PREFIX~~-hidden">
  </section>
  <div class="~~PREFIX~~-event__switches">
    <button type="button" class="~~PREFIX~~-event__switch ~~PREFIX~~-event__switch_active" data-section="address">Адрес</button>
    <button type="button" class="~~PREFIX~~-event__switch" data-section="services">Сервисы</button>
  </div>
</div>`;

const noEventTemplate = `<div class="~~PREFIX~~-event ">
<section class="~~PREFIX~~-section_type_empty ~~PREFIX~~-section">
<h4 class="~~PREFIX~~-event__title">${NO_EVENT_TITLE}</h4>
<h5 class="~~PREFIX~~-event__hours">${NO_EVENT_SUBTITLE}</h5>
<div>
<p class="~~PREFIX~~-event__metro">${NO_EVENT_TEXT}</p>
<p class="~~PREFIX~~-event__metro">${NO_EVENT_PHONE}</p>
</div>
</section>
</div>`;

const icons = {
  'осмотр врача': 'medkit',
  'перевязка ран': 'medkit',
  'социальная помощь': 'help',
  'выдача лекарств': 'pills',
  'подбор очков': 'eyes',
  'вакцинация': 'vaccine',
  'тест на covid': 'covid',
  'тест на гепатит': 'covid',
  'тест на сифилис': 'covid',
  'тест на вич': 'aids',
  'парикмахер': 'haircut',
  'телефон': 'phone',
};


export default class Event {
  constructor({ prefix = 'calendar', eventData = {} }) {
    const element = document.createElement('div');
    this._prefix = prefix;
    element.innerHTML = eventData.title
      ? eventTemplate.replaceAll('~~PREFIX~~', prefix)
      : noEventTemplate.replaceAll('~~PREFIX~~', prefix);
    this._element = element.firstChild;
    //    this._eventData = eventData;
    console.log(this._element);
    if (eventData.title) {
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

  _createOneService(serviceData) {
    console.log(serviceData.activities);
    console.log(icons['тест на covid']);
    const activities = serviceData.activities
      .reduce((acc, item) => (acc +
        `<li class="${this._prefix}-event__activity ${icons[item.toLowerCase()] ? 'calendar-event__activity_icon_'
          + icons[item.toLowerCase()] : ''}">${item}</li>`), '');
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
    console.log(eventData);
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