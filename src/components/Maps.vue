<template> //key=AIzaSyD3NsJ0AkX_oS-53dnJ9ujIUQMRmkk9f
  <div id = "coordinates">
    <h2>Coordinates</h2>
    <p>{{ coordinates.lat }} Latitude, {{ coordinates.lng }} Longitude</p>
  </div>
</template>
<script>


export default {
  
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      }
    }
  },
  
  created() {
    //get user coordinates from browser request
    this.$getLocation({})
      .then(coordinates => {
        this.coordinates = coordinates;
      });
  }
}
</script>
<style scoped>
  .coordinates {
    font: white;
  }
</style>