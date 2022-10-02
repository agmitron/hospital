import 'Event.css';

export default class Event {
  constructor({ layout = 'web', data = {}, callbacks = [] }) {
    this._data = JSON.parse(JSON.stringify(data));
    this._callbacks = [...callbacks];
    this._layout = layout;
  }

  render() {

  }
}