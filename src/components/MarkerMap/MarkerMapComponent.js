import L from 'leaflet';
//import MarkersData from '../data/MarkersData';
//import GpsUtils from '../../util/GpsUtils';

// createLabelIcon is from https://gis.stackexchange.com/questions/157696/leaflet-js-text-is-not-showing-on-map
function createLabelIcon(labelClass, labelText) {
  return L.divIcon({
    className: labelClass,
    html: labelText,
  });
}

/* eslint-enable */

export default {
  name: 'MarkerMap',
  props: {
    userLat: Number,
    userLon: Number,
    markers: Array
  },
  data() {
    return {
     
    };
  },
  computed: {
    
  },
  created() {
    
  },
  methods: {
    goToListView() {
      let vm = this;
      vm.$router.push({
        name: 'Hello',
        params: {
        }
      });
    },
    showMap() {
      let vm = this;
      const mymap = L.map('mapid').setView([vm.userLat, vm.userLon], 10);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZWxvZmdyZW4iLCJhIjoiY2poZmUxanNpMTd5dzMwbWQybTN2MjhjaiJ9.cKtaDiFIjeHJAoIt7h7ZDw',
      }).addTo(mymap);

      const currentLocationMarker = L.marker([vm.userLat, vm.userLon], {
        icon: createLabelIcon('mapLabel', 'Your Location')
      }).addTo(mymap);
      currentLocationMarker.bindPopup('Your last detected location')
      //.openPopup();

      for (let i = 0; i < vm.markers.length; i++) {
        let markerData = vm.markers[i];
        /*const marker = L.marker([markerData.lat, markerData.lng], { 
          icon: createLabelIcon('mapLabel', 'Marker') }).addTo(mymap);
        marker.bindPopup('<b>' + markerData.name + '</b><br><a href="' + markerData.gmapsUrl + '" target="_blank">Get Directions</a>').openPopup();
        */
        L.marker([markerData.lat, markerData.lng]).addTo(mymap)
          .bindPopup(vm.getPopupHtml(markerData))
          //.openPopup();

      }
    },
    getPopupHtml(markerData) {
      let html =
        '<b>' + markerData.name + '</b>' +
        '<br><a href="' + markerData.gmapsUrl + '" target="_blank">Get Directions</a>';

      if (markerData.waymarkUrl) {
        html += '<br><a href="' + markerData.waymarkUrl + '" target="_blank">Marker info</a>';
      }
      if (markerData.article) {
        html += '<br><a href="' + markerData.article + '" target="_blank">Read Article</a>';
      }
      return html;
    }
  },
  mounted() {
    let vm = this;
    vm.showMap();
    /*
    demo of showing label on map.*/
    /* const mymap = L.map('mapid').setView([vm.userLat, vm.userLon], 15);
     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
       maxZoom: 18,
       id: 'mapbox.streets',
       accessToken: 'pk.eyJ1IjoiZWxvZmdyZW4iLCJhIjoiY2poZmUxanNpMTd5dzMwbWQybTN2MjhjaiJ9.cKtaDiFIjeHJAoIt7h7ZDw',
     }).addTo(mymap);

     const marker = L.marker([vm.userLat, vm.userLon], { icon: createLabelIcon('mapLabel', 'a place') }).addTo(mymap);
     marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup(); */
  },
};
