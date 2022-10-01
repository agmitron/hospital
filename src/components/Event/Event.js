import 'Event.css';

export default class Event {
  constructor ({selectors = {}, data = {}, callbacks = []}) {
    this._selectors = {...selectors};
    this._data = JSON.parse(JSON.stringify(data));
    this._callbacks = [...callbacks];
  }

  render() {
    
  }
}