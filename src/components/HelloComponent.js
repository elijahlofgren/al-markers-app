import axios from 'axios';
//import L from 'leaflet';
//import MarkersData from '../data/MarkersData';
import GpsUtils from '../util/GpsUtils';
//import MarkerMap from '@/components/MarkerMap/MarkerMap';

// createLabelIcon is from https://gis.stackexchange.com/questions/157696/leaflet-js-text-is-not-showing-on-map
/*function createLabelIcon(labelClass, labelText) {
  return L.divIcon({
    className: labelClass,
    html: labelText,
  });
}*/

// Set this to true when testing on desktop (not when building for mobile app)
const useHardCodedGps = true;

/* eslint-enable */

export default {
  name: 'HelloWorld',
  components: {
    // MarkerMap
  },
  data() {
    return {
      markers: null,
      tags: ['Select One'],
      selectedTag: 'Select One',
      // Hardcoded for demo/testing
      userLat: 32.37685,
      userLon: -86.30078333
    };
  },
  computed: {
    filteredMarkers() {
      let vm = this;
      if (vm.selectedTag && vm.seletedTag != '' && vm.selectedTag != 'Select One') {
        return vm.markers.filter(m => m.tags.indexOf(vm.selectedTag) !== -1);
      } else {
        return vm.markers;
      }
    }
  },
  created() {
    const vm = this;
    // Hardcoded for demo/testing
    //vm.userLat = 32.37685;
    //vm.userLon = -86.30078333;
    vm.rawMarkersData = [];
    axios.get("https://sheets.googleapis.com/v4/spreadsheets/1S5y_j8oFyPFq0GuRNybX7YFuQAU46Umho-q3e1UKPok/values/Sheet1?key=AIzaSyAEgmM-Fnzc3ihs54orFIiwkyaZo9ywKQs")
      .then((response) => {
        vm.rawSpreadsheetData = response.data;
        //console.log(vm.rawSpreadsheetData.values);
        // Start at index 1 since index 0 is column headers
        const startRowIndex = 1;
        for (let i = startRowIndex; i < vm.rawSpreadsheetData.values.length; i++) {
          let row = vm.rawSpreadsheetData.values[i];
          let lat = row[5];
          let lng = row[6];
          if (lat && lng) {
            let item = {
              id: row[0],
              county: row[1],
              city: row[2],
              name: row[3],
              tags: row[4],
              lat: lat,
              lng: lng,
              waymark: row[7],
              latKey: row[8],
              article: row[9]
            };

            vm.addTags(item);

            vm.rawMarkersData.push(item);
          }
        }

        if (useHardCodedGps) {
          vm.gpsReady();
        } else {
          /* eslint-disable */
          navigator.geolocation.getCurrentPosition(
            function success(position) {
              vm.userLat = position.coords.latitude;
              vm.userLon = position.coords.longitude;
              //alert('Latitude: ' + position.coords.latitude + ' Longitude: ' + position.coords.longitude);
              vm.gpsReady();
            },
            function error(error) {
              alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            },
          );
        }
      }).catch((err) => {
        alert('Error' + err);
      })
  },
  methods: {
    goToMapView() {
      let vm = this;
      vm.$router.push({
        name: 'MarkerMap',
        params: {
          userLat: vm.userLat,
          userLon: vm.userLon,
          markers: vm.filteredMarkers
        }
      });
    },
    /*
    showMap() {
      let vm = this;
      const mymap = L.map('mapid').setView([vm.userLat, vm.userLon], 15);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZWxvZmdyZW4iLCJhIjoiY2poZmUxanNpMTd5dzMwbWQybTN2MjhjaiJ9.cKtaDiFIjeHJAoIt7h7ZDw',
      }).addTo(mymap);

      const currentLocationMarker = L.marker([userLat, userLon], {
        icon: createLabelIcon('mapLabel', 'Your Location')
      }).addTo(mymap);
      currentLocationMarker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();

      for (let i = 0; i < vm.markers.length; i++) {
        let markerData = vm.markers[i];
        L.marker([markerData.lat, markerData.lng]).addTo(mymap)
          .bindPopup(vm.getPopupHtml(markerData))
          .openPopup();

      }
    },*/
    /*getPopupHtml(markerData) {
      let html =
        '<b>' + markerData.name + '</b>' +
        '<br><a href="' + markerData.gmapsUrl + '" target="_blank">Get Directions</a>';

      if (markerData.waymarkUrl) {
        html += '<br><a href="' + markerData.waymarkUrl + '" target="_blank">Waymark info</a>';
      }
      if (markerData.article) {
        html += '<br><a href="' + markerData.article + '" target="_blank">Read Article</a>';
      }
      return html;
    },*/
    addTags(item) {
      let vm = this;
      if (item.tags.length > 0) {
        let tags = item.tags.split(',');
        if (tags && tags.length > 0) {
          for (let i = 0; i < tags.length; i++) {
            let trimmed = tags[i].trim();
            if (vm.tags.indexOf(trimmed) == -1) {
              vm.tags.push(trimmed);
            }
          }
        }

      }
    },
    swipe(direction, marker) {
      console.log("Swipe to " + direction + " for maker id: " + marker.id);
      var storage = window.localStorage;
      if (direction === 'right') {
        marker.visited = true;
        storage.setItem(marker.id, "visited") // Pass a key name and its value to add or update that key.
        var isVisited = storage.getItem(marker.id); // Pass a key name to get its value.
        console.log("isVisited for " + marker.id + " is set to: " + isVisited);
      }
      if (direction === 'left') {
        marker.visited = false;
        storage.removeItem(marker.id) // Pass a key name to remove that key from storage.
      }
    },
    gpsReady() {
      let vm = this;
      var storage = window.localStorage;
      const preppedData = vm.rawMarkersData;
      // URL like
      // https://www.google.com/maps/?q=32.37685,-86.30078333
      const gmapUrlPrefix = 'https://www.google.com/maps/?q=';
      const hereMapsUrlPrefix = 'https://wego.here.com/search/';
      const waymarkUrlPrefix = 'http://www.waymarking.com/waymarks/';
      const latUrlPrefix = 'http://www.lat34north.com/HistoricMarkersAL/MarkerDetail.cfm?KeyID=';
      for (let i = 0; i < preppedData.length; i += 1) {
        const marker = preppedData[i];
        if (marker.lat && marker.lng) {
          // Map URLS
          preppedData[i].gmapsUrl = `${gmapUrlPrefix}${marker.lat},${marker.lng}`;
          preppedData[i].hereMapsUrl = `${hereMapsUrlPrefix}${marker.lat},${marker.lng}`;
          if (marker.waymark) {
            preppedData[i].waymarkUrl = `${waymarkUrlPrefix}${marker.waymark}`;
          } else {
            preppedData[i].waymarkUrl = null;
          }
          preppedData[i].latUrl = `${latUrlPrefix}${marker.latKey}`;
          preppedData[i].visited = false;

          var isVisited = storage.getItem(marker.id); // Pass a key name to get its value.
          //console.log("isVisited for " + marker.id + " is set to: " + isVisited);
          if (isVisited != null) {
            preppedData[i].visited = true;
          }
          // Measure between two points:
          const lat = preppedData[i].lat;
          const lon = preppedData[i].lng;
          const result = GpsUtils.distanceTo({
            lat,
            lon
          }, {
            lat: vm.userLat,
            lon: vm.userLon
          }, );
          preppedData[i].distance = result;
        }
      }

      // console.log(JSON.stringify(preppedData));

      // JSON responses are automatically parsed.
      vm.markers = preppedData.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      //vm.showMap();
    }
  },
  mounted() {
    /*
    demo of showing label on map.*/
    /* const mymap = L.map('mapid').setView([userLat, userLon], 15);
     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
       maxZoom: 18,
       id: 'mapbox.streets',
       accessToken: 'pk.eyJ1IjoiZWxvZmdyZW4iLCJhIjoiY2poZmUxanNpMTd5dzMwbWQybTN2MjhjaiJ9.cKtaDiFIjeHJAoIt7h7ZDw',
     }).addTo(mymap);

     const marker = L.marker([userLat, userLon], { icon: createLabelIcon('mapLabel', 'a place') }).addTo(mymap);
     marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup(); */
  },
};
