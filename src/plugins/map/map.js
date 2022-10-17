// Инициализация карты (объект ymaps загружается в глобальный скоуп через тег <script> в html-файле)
function initMap(mapCenterCoords, event) {
	ymaps.ready(init);

	function init() {
		// создаем экземпляр карты
		const map = new ymaps.Map(
			'map',
			{
				center: mapCenterCoords,
				zoom: 8,
			},
			{
				searchControlProvider: 'yandex#search',
			}
		);
		// если в объекте события имеются координаты, то для отображения маркера берём их, если нет - берем адрес
		if (event.coordinates) {
			console.log('🚀 ~ file: map.js ~ line 21 ~ init ~ event.coordinates', event.coordinates);
			// добавляем маркер по координатам
			map.geoObjects.add(
				new ymaps.Placemark(
					[event.coordinates],
					{
						balloonContent: 'Мобильная клиника',
					},
					{
						preset: 'islands#redMedicalIcon',
						iconColor: 'red',
					}
				)
			);
		} else if (event.address) {
			console.log('🚀 ~ file: map.js ~ line 35 ~ init ~ event.addres', event.address);
			// запрашиваем координаты по адресу и добавляем маркер
			ymaps
				.geocode(
					event.address,
					// опции запроса (подробнее на https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml)
					{
						results: 1, // оставляем только один результат для экономии трафика
					}
				)
				.then(
					function (res) {
						// первый результат поиска объекта по адресу
						const geoPoint = res.geoObjects.get(0);
						// его координаты
						const geoPointCoords = geoPoint.geometry.getCoordinates();
						// задаем пресет для иконки объекта
						geoPoint.options.set('preset', 'islands#redMedicalIcon');
						// выводим строку в иконке геообъекта
						geoPoint.properties.set('iconCaption', `Мобильная клиника`);
						// добавляем объект на карту
						map.geoObjects.add(geoPoint);
					},
					function (err) {
						// обработка ошибки
						console.log('Ошибка получения координат по адресу объекта', err);
					}
				);
		}

		// слушатель событий для уничтожения карты при закрытии попапа
		document.querySelector('.calendar-map-popup__close-button').addEventListener('click', () => map.destroy());
		document.addEventListener('keydown', (evt) => {
			if (evt.key === 'Escape') map.destroy();
		});
	}
}

export { initMap };
