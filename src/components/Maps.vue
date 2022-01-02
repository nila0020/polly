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
  },
  setup(props) {
    //Load map
    console.log("1", props.qLong);
    let myMap;
    //const reactiveProperties = reactive({ pos: null });
    onMounted(() => {
      myMap = leaflet.map("myMap").setView([59.855727, 17.633445], 13);

      console.log("2", props.qLong);
      new leaflet.marker([props.qLat, props.qLong]).addTo(myMap);
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
      function checkDistance(a, b) {
        if (myMap.distance(a, b) < 3000) {
          alert("Within range");
          socket.emit("withinRangeEmit", true);
        }
        console.log("avstånd i meter", myMap.distance(a, b));
      }

      // Find user location
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition);
      }, 5000);
      var lat, lng, marker, latLng;

      function getPosition(position) {
        if (marker) {
          myMap.removeLayer(marker);
        }

        lat = position.coords.latitude;
        lng = position.coords.longitude;
        latLng = [lat, lng];
        marker = leaflet.marker([lat, lng]).addTo(myMap);

        return latLng;
      }

      // Current distance from user location
      setTimeout(
        () => console.log(checkDistance(latLng, [59.855727, 17.633445])),
        6000
      );
      setTimeout(
        () => console.log("Marker din position utanför", latLng),
        6000
      );

      //Icon declaration
      /* var currentIcon = leaflet.icon({
        iconUrl: "img/redIcon.png",
        iconSize: [38, 95], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      }); */
    });
  },
};
</script>
<style scoped>
#myMap {
  height: 1200px;
}
</style>