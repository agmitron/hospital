const NO_EVENT_TITLE = 'Нет выезда';
const NO_EVENT_SUBTITLE = 'На данную дату выезд не запланирован';
const NO_EVENT_TEXT = 'Уточнить дату выезда можно по телефону:';
const NO_EVENT_PHONE = '+7-952-230-03-49';
const CANCELLED_TITLE = 'Выезд отменен';
const CANCELLED_SUBTITLE = 'На данную дату выезд отменен';
const CANCELLED_TEXT = 'Уточнить дату выезда можно по телефону:';
const CANCELLED_PHONE = '+7-952-230-03-49';

export const eventTemplate = `<div class="~~PREFIX~~-event">
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

export const noEventTemplate = `<div class="~~PREFIX~~-event ">
<section class="~~PREFIX~~-section_type_empty ~~PREFIX~~-section">
<h4 class="~~PREFIX~~-event__title">${NO_EVENT_TITLE}</h4>
<h5 class="~~PREFIX~~-event__hours">${NO_EVENT_SUBTITLE}</h5>
<div>
<p class="~~PREFIX~~-event__metro">${NO_EVENT_TEXT}</p>
<p class="~~PREFIX~~-event__metro">${NO_EVENT_PHONE}</p>
</div>
</section>
</div>`;

export const cancelledTemplate = `<div class="~~PREFIX~~-event ~~PREFIX~~-event_cancelled">
<section class="~~PREFIX~~-section ~~PREFIX~~-section_type_empty">
<h4 class="~~PREFIX~~-event__title">${CANCELLED_TITLE}</h4>
<h5 class="~~PREFIX~~-event__hours">${CANCELLED_SUBTITLE}</h5>
<div>
<p class="~~PREFIX~~-event__metro">${CANCELLED_TEXT}</p>
<p class="~~PREFIX~~-event__metro">${CANCELLED_PHONE}</p>
</div>
</section>
</div>`;

export const icons = {
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
