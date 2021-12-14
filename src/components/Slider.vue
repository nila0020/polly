<template>
  <div>
    <Slider
      v-model="value"
      :min="this.min"
      :max="this.max"
      v-on:click="showValue"
    />
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
    unit: "",
  },
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    showValue: function () {
      console.log(this.value);
      console.log(this.min);
      console.log(this.max);
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>