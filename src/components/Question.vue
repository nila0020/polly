<template>
  <div
    class="infoBox"
    v-if="question.info"
    v-on:click="hideInfo"
    v-show="!infoHidden"
  >
    Information:
    <br />
    {{ question.info }}
  </div>
  <div class="outerGrid" v-if="!questionHidden">
    <div class="picture">
      <img
        :src="question.pic"
        style="width: 100%; height: 100%; object-fit: cover"
      />
    </div>
    <div class="questionBar">
      {{ question.q }}
    </div>
    <div class="MCQ_answerGrid" v-if="this.question.type == 'MCQ'">
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
    <div class="slider_answerGrid" v-if="this.question.type == 'slider'">
      <Slider
        class="sliderStyle"
        :poll="true"
        :min="minVal"
        :max="maxVal"
        :unit="unit"
        v-on:sliderValue="getSliderValue"
      />
      <button
        v-on:click="answer(sliderValue)"
        class="sliderButton start_buttons"
      >
        {{ sliderValue }} {{ unit }}
      </button>
    </div>
  </div>
</template>
<script>
import Slider from "@/components/Slider.vue";

export default {
  name: "Bars",
  data: function () {
    return {
      infoHidden: false,
      questionHidden: false,
      minVal: this.question.aS[1],
      maxVal: this.question.aS[2],
      unit: this.question.aS[0],
      sliderValue: null,
    };
  },
  components: {
    Slider,
  },
  props: {
    question: Object,
  },
  methods: {
    hideInfo: function () {
      console.log(this.question.pic);
      this.infoHidden = true;
      this.questionHidden = false;
    },

    answer: function (answer) {
      this.infoHidden = false;
      this.questionHidden = true;
      console.log("i questions emit: " + answer);
      this.$emit("answer", answer);
    },
    getSliderValue(sliderValue) {
      this.sliderValue = sliderValue;
    },
  },
};
</script>
<style scoped>
.infoBox {
  color: white;
  background-color: #95ffca;
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
  width: 55vh;
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
.slider_answerGrid {
  display: flex;
  flex-direction: column;
  grid-row: 1fr 1fr;
  border-radius: 0.5em;
  align-items: center;
  justify-content: space-evenly;
  background-color: green;
}
.sliderStyle {
  width: 80%;
  height: 1%;
}
.sliderButton {
  height: 20%;
  width: 40%;
}
.MCQ_answerGrid {
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