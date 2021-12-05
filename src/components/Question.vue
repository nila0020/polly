<template>
  <div class="outerGrid">
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
      <v-btn
        v-for="a in question.a"
        v-on:click="answer(a)"
        v-bind:key="a"
        class="start_buttons"
        id="answerButtons"
      >
        {{ a }}
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "Bars",
  props: {
    question: Object,
  },
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
    },
  },
};
</script>
<style scoped>
.outerGrid {
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: 40% 10% 45%;
  grid-gap: 2vh;
  background-color: white;
  color: black;
}
.questionBar {
  color: white;
  background-color: purple;
  border: 0px;
  border-radius: 1em;
  text-align: center;
}
.answerGrid {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2vh;
  background-color: white;
  color: black;
  overflow: hide;
  text-align: center;
}
#answerButtons {
  border: 0px;
  border-radius: 1em;
}
.picture {
  width: 100%;
  object-fit: fill;
  overflow: hidden;
  border: 0px;
  border-radius: 1em;
}
</style>