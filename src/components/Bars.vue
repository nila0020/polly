<template>
  <h1>Leaderboard:</h1>
  <div class="wrapper">
    <div class="bar" v-for="(item, key) in scoreBoard.scores" v-bind:key="key">
      <div v-bind:style="{ height: 50 * this.calcBar(item.score) + 'px' }">
        <span> {{ this.calcBar(item.score) }} </span>
      </div>
      <div>{{ key }}:<br />{{ item.userName }}</div>
    </div>
    <div class="bar">
      <div
        v-bind:style="{ height: 50 * calcBar(this.scoreBoard.score) + 'px' }"
      >
        <span> {{ calcBar(this.scoreBoard.score) }} </span>
      </div>
      <div style="bold" class="UserNameText">
        You:<br />{{ this.scoreBoard.userName }}
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
      cA: [],
      scores: {
        key: {
          userName: "",
          score: Number,
          barHeight: Number,
        },
      },
    },
    userId: String,
  },
  methods: {
    calcBar(Item) {
      this.barHeight = Item / this.scoreBoard.scores["1"].score;
      return this.barHeight;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: grid;
  width: flex;
  flex-direction: row;
  height: 40vh;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: flex-end;
}
.bar {
  display: inline-block;
  width: 15vw;
  overflow-wrap: break-word;
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
  background-color: pink;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color: yellow;
}
.bar:nth-child(6) div:nth-child(1) {
  background-color: indigo;
}
</style>
