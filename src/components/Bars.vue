<template>
  <h1>Leaderboard:</h1>
  <div class="fullScope">
    <div class="wrapped">
      <div
        class="bar"
        v-for="(item, key) in scoreBoard.scores"
        v-bind:key="key"
      >
        <div
          v-bind:style="{
            height:
              (100 * item.score) / this.scoreBoard.scores['1'].score + '%',
          }"
        >
          <span> {{ item.score }} </span>
        </div>
        <div class="label">{{ key }}:<br />{{ item.userName }}</div>
      </div>

      <div class="bar">
        <div
          v-bind:style="{
            height:
              (100 * this.scoreBoard.score) /
                this.scoreBoard.scores['1'].score +
              '%',
          }"
        >
          <span> {{ this.scoreBoard.score }} </span>
        </div>
        <div class="label">You:<br />{{ this.scoreBoard.userName }}</div>
      </div>
    </div>
  </div>

  <!-- <h2> You are ranked as the {{rank}} </h2> -->
</template>

<script>
export default {
  name: "Bars",
  props: {
    scoreBoard: {
      userName: String,
      score: Number,
      scores: {},
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fullScope {
  height: 100%;
  width: 100%;
  background: linear-gradient(#17b27f, #319881, #2ab0b4, #3096c2);
}
.wrapped {
  display: grid;
  width: flex;
  flex-direction: row;
  height: 40vh;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: flex-end;
}
.bar {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: 100%;
}
.bar div {
  margin-top: auto;
}
.bar span {
  position: relative;
  top: -1.2em;
}
.label {
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, -10%);
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
  background-color: pink;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color: yellow;
}
.bar:nth-child(6) div:nth-child(1) {
  background-color: indigo;
}
</style>
