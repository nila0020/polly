<template>
  <h1>Leaderboard:</h1>
  <div class="wrapper">
    <div class="bar" v-for="(item, key) in scoreBoard.scores" v-bind:key="key">
      <div v-bind:style="{ height: 50 * item + 'px' }">
        <span> {{ item }} </span>
      </div>
      <div>
        {{ key }}
      </div>
    </div>
  </div>
  <!-- <h2> You are ranked as the {{rank}} </h2> -->
</template>

<script>
export default {
  name: "Bars",
  props: {
    scoreBoard: Object,
    userName: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: grid;
  width: flex;
  flex-direction: row;
  height: 50vh;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: flex-end;
}
.bar {
  display: inline-block;
  width: 15vw;
}
.bar span {
  position: relative;
  top: -1.2em;
}
.bar:nth-child(1) div:nth-child(1) {
  background-color: red;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color: blue;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color: teal;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color: purple;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color: yellow;
}
.bar:nth-child(6) div:nth-child(1) {
  background-color: indigo;
}
</style>
