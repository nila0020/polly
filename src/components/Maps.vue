<template>
  <div
    class="box map"
    v-on:click="mapExpand"
    v-bind:class="{ mapBig: mapBig, mapSmall: mapSmall }"
  >
    <div id="myMap" v-on:click="update1"></div>
  </div>
</template>
<script>
import leaflet from "leaflet";
import { onMounted } from "vue";
import io from "socket.io-client";
const socket = io();
export default {
  props: {
    qLat: Number,
    qLong: Number,
    gameId: Number,
  },
  setup(props) {
    //Load map
    let myMap;
    onMounted(() => {
      //Map Setup
      myMap = leaflet.map("myMap").setView([props.qLat, props.qLong], 13);
      leaflet
        .tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGljdG9ydmlrdG9yIiwiYSI6ImNreGM4aW43ZjRkNzUydXFvYnB5eDZ3d3MifQ.gSVvXd28nfGeuWEnHdIEhQ",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1IjoicGljdG9ydmlrdG9yIiwiYSI6ImNreGM4aW43ZjRkNzUydXFvYnB5eDZ3d3MifQ.gSVvXd28nfGeuWEnHdIEhQ",
          }
        )
        .addTo(myMap);

      // Distance function
      function checkDistance(latLng, props) {
        if (myMap.distance(latLng, [props.qLat, props.qLong]) < 20) {
          console.log("props i checkdistance", props.gameId);
          const d = {};
          d.gameId = props.gameId;
          d.activeQuestion = true;
          socket.emit("withinRangeEmit", d);
        }
        console.log(
          "avstånd i meter",
          myMap.distance(latLng, [props.qLat, props.qLong])
        );
      }

      var lat, lng, markerMe, latLng;
      function getPosition(position) {
        if (markerMe) {
          myMap.removeLayer(markerMe);
        }
        var meIcon = leaflet.icon({
          iconUrl: "img/meIcon.png",
          iconSize: [24, 24], // size of the icon
          iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        });
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        latLng = [lat, lng];
        markerMe = leaflet.marker([lat, lng], { icon: meIcon }).addTo(myMap);
        return latLng;
      }

      function drawQuestion(props) {
        var qIcon = leaflet.icon({
          iconUrl: "img/redIcon.png",
          iconSize: [36, 36], // size of the icon
          iconAnchor: [18, 36], // point of the icon which will correspond to marker's location
        });
        var markerQ = new leaflet.marker([props.qLat, props.qLong], {
          icon: qIcon,
          title: "qPin",
        }).addTo(myMap);
        console.log(markerQ)
      }
      // Find user location
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition);
      }, 1000);

      setInterval(() => {
        checkDistance(latLng, props);
      }, 1000);

      setInterval(() => {
        drawQuestion(props);
      }, 1000);
    });
  },
};
</script>
<style scoped>
#myMap {
  height: 800px;
}
</style>