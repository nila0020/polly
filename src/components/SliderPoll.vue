<template>
  <div>
    <div>
      <Slider
        v-model="value"
        :min="this.min"
        :max="this.max"
        @change="sendValue"
      />
    </div>
    <div class="output">{{ this.value[1] }} {{ this.unit }}</div>
    </div>
</template>

<script>
import Slider from "@vueform/slider";

export default {
  components: {
    Slider,
  },
  props: {
    min: Number,
    max: Number,
    unit: String,
  },
  data() {
    return {
      value: [0, 10, 20],
    };
  },
  methods: {
    showValue: function () {},

    sendValue: function (value) {
      console.log("i questions emit: " + value);
      this.$emit("sliderValue", value);
    },
  },
};
</script>
<style src="@vueform/slider/themes/default.css">
</style>