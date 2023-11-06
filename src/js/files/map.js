if (document.getElementById('map')) {
  window.map = null;

  async function initMap() {
    await ymaps3.ready;

    const LOCATION = {
      center: [37.67119249999992, 55.75224706896767],
      zoom: 17,
    };

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapMarker,
    } = ymaps3;

    const map = new YMap(
      document.getElementById('map'),

      { location: LOCATION }
    );

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    const el = document.createElement('img');
    el.className = 'marker';
    el.src = './img/icons/map-pin.svg';
    el.onclick = () => map.update({ location: { ...LOCATION, duration: 400 } });
    map.addChild(new YMapMarker({ coordinates: LOCATION.center }, el));
  }
  initMap();
}
