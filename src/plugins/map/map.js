// Инициализация карты с маркером в центре
export default function inintMap({ markerCoordinates, markerAddres }) {
	ymaps.ready(init);

	function init() {
		const map = new ymaps.Map(
			'map',
			{
				center: markerCoordinates,
				zoom: 12,
			},
			{
				searchControlProvider: 'yandex#search',
			}
		);
		const marker = new ymaps.Placemark(
			markerCoordinates,
			{
				balloonContent: '<strong>Мобильная клиника: </strong>' + markerAddres,
				hintContent: '<strong>Мобильная клиника: </strong>' + markerAddres,
			},
			{
				preset: 'islands#dotIcon',
				iconColor: 'darkred',
			}
		);
		map.geoObjects.add(marker);
	}
}
