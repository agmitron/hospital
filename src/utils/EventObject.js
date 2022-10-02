export class EventObject {
  constructor() {
    this.init();
  }

  init() {
    this._isCancelled = false;
    this._title = '';
    this._date = '';
    this._metro = '';
    this._address = '';
    this._services = [];
  }

  set({ date, title, metro, address, isCancelled }) {
    this._date = date;
    this._title = title;
    this._metro = metro;
    this._address = address;
    this._isCancelled = isCancelled;
  }

  addService({ hours, activity }) {
    this._services.push({ hours, activities: [activity] });
  }

  addActivity(activity) {
    this._services[this._services.length - 1].activities.push(activity);
  }

  get() {
    return {
      isCancelled: this._isCancelled,
      title: this._title,
      date: this._date,
      metro: this._metro,
      address: this._address,
      services: JSON.parse(JSON.stringify(this._services))
    };
  }

  isValid() {
    return this._title && this._title !== 'Заголовок';
  }
}

export const eventObject = new EventObject();