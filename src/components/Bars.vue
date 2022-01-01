<template>
  <div class="fullScope">
    <h1 style="color: white">Leaderboard:</h1>
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
            backgroundColor: stapleColor(item),
          }"
        >
          <span v-if="item.score != 0"> {{ item.score }} </span>
        </div>
        <div class="label">
          {{ key }}:<br />
          <div :class="bold(item)" v-if="item.score != 0">
            {{ item.userName }}
          </div>
        </div>
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
        <div class="label">
          You:<br />
          <div v-if="this.scoreBoard.userName">
            {{ this.scoreBoard.userName }}
          </div>
        </div>
      </div>
    </div>
  </div>
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
  methods: {
    bold: function (item) {
      if (item.userName == this.scoreBoard.userName) {
        return "boldText";
      } else {
        return "notBold";
      }
    },
    stapleColor: function (item) {
      if (item.userName == this.scoreBoard.userName) {
        return "coral";
      } else {
        return null;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fullScope {
  height: 100vh;
  width: 100vw;
  font-family: "Baloo Bhaijaan 2", cursive;
  background: linear-gradient(#17b27f, #319881, #2ab0b4, #3096c2);
}
.boldText {
  font-weight: bold;
}

.wrapped {
  display: grid;
  box-sizing: border-box;
  padding: 0.3em;
  width: 100%;
  height: 40vh;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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
  color: white;
}
.label {
  position: absolute;
  color: white;
  width: 95%;
  font-size: 4vw;
  overflow-wrap: break-word;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, -10%);
}
.bar:nth-child(1) div:nth-child(1) {
  background-color: lavender;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color: plum;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color: cyan;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color: lightgreen;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color: yellow;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}
.bar:nth-child(6) div:nth-child(1) {
  background-color: coral;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}
</style>
