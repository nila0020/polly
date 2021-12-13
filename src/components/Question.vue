<template>
  <div class="infoBox" v-on:click="hideInfo" v-show="infoHidden">
    {{ question.info }}
  </div>
  <div class="outerGrid" v-show="!infoHidden">
    <div class="picture">
      <img
        v-bind:src="'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Uppsala_Cathedral_in_February.jpg/1920px-Uppsala_Cathedral_in_February.jpg'"
        style="width: 100%; height: 100%; object-fit: cover"
      />
    </div>
    <div class="questionBar">
      {{ question.q }}
    </div>
    <div class="answerGrid">
      <button
        v-for="a in question.a"
        v-on:click="answer(a)"
        v-bind:key="a"
        class="start_buttons"
        id="answerButtons"
      >
        <p>
          {{ a }}
        </p>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Bars",
  data: function () {
    return { infoHidden: true };
  },
  props: {
    question: Object,
  },
  methods: {
    hideInfo: function () {
      this.infoHidden = false;
    },
    answer: function (answer) {
      console.log("i questions emit: " + answer);
      this.$emit("answer", answer);
    },
  },
};
</script>
<style scoped>
.infoBox {
  color: white;
  background-image: linear-gradient(144deg, rgb(0, 24, 4), #116d37, #95ffca);
  border: 0px;
  border-radius: 0.5em;
  width: 55vh;
  height: 98vh;
  justify-content: center;
  align-items: center;
  font-size: 3.5vh;
}
.outerGrid {
  display: grid;
  height: 98vh;
  grid-template-rows: 40% auto auto;
  grid-gap: 1vh;
  background-color: white;
  color: black;
}
.questionBar {
  display: flex;
  color: white;
  background-color: Black;
  border-width: 10px;
  border-image: linear-gradient(144deg, rgb(0, 102, 17), #e6fff0);
  border-radius: 0.5em;
  justify-content: center;
  align-items: center;
  font-size: 4vh;
}
.answerGrid {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1vh;
  background-color: white;
  color: black;
  overflow: hide;
}
#answerButtons {
  background-image: linear-gradient(144deg, rgb(1, 65, 12), #116d37, #95ffca);
  border: 0px;
  font-size: 4vh;
  border-radius: 0.5em;
}
.picture {
  width: 100%;
  object-fit: fill;
  overflow: hidden;
  border: 0px;
  border-radius: 0.5em;
}
</style>