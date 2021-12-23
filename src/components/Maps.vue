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

export default {
  setup() {
    let myMap;
    onMounted(() => {
      myMap = leaflet.map("myMap").setView([59.855727, 17.633445], 13);

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

      myMap.on("click", function (e) {
        new leaflet.Marker([e.latlng.lat, e.latlng.lng]).addTo(myMap);
      });
    });
  },
};
</script>
<style scoped>
#myMap {
  height: 1200px;
}
</style>