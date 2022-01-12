<template>
  <div>
    <div>
      <Slider
        v-if="!poll && this.min>0 &&  this.max>0"
        v-model="value"
        :min="this.min"
        :max="this.max"
        @change="sendValue"
      />
      <Slider
        v-if="poll"
        v-model="valuePoll"
        :min="this.min"
        :max="this.max"
        @change="sendValuepoll"
      />
    </div>
  </div>
</template>

<script>
import Slider from "@vueform/slider";

export default {
  components: {
    Slider,
  },
  props: {
    poll: Boolean,
    min: Number,
    max: Number,
    unit: String,
  },
  data() {
    return {
      value: [0, 10, 20],
      valuePoll: 10,
    };
  },
  methods: {
    showValue: function () {},

    sendValue: function (value) {
      console.log("i questions emit: " + value);
      this.$emit("sliderValue", value);
    },
    sendValuepoll: function (valuePoll) {
      console.log("i questions emit: " + valuePoll);
      this.$emit("sliderValue", valuePoll);
    },
  },
};
</script>
<style src="@vueform/slider/themes/default.css">
</style>