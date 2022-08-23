// 60.293134, 29.205871;
// 59.529034, 31.323486;

// Инициализация карты (объект ymaps загружается в глобальный скоуп через тег <script> в html-файле)
function initMap(mapCenterCoords, addres) {
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
		// запрашиваем координаты по адресу и добавляем объект на карту
		ymaps
			.geocode(
				addres,
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
		// слушатель событий для уничтожения карты при закрытии попапа
		document.querySelector('.calendar-map-popup__close-button').addEventListener('click', () => map.destroy());
		document.addEventListener('keydown', (evt) => {
			if (evt.key === 'Escape') map.destroy();
		});
	}
}

export { initMap };
