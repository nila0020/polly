<template>
  <Slider v-model="value" :min="minVal" :max="maxVal" :unit="unit" />
</template>

<script>
import Slider from "@/components/Slider.vue";
export default {
  name: "User",
  data: function () {
    return {
      minVal: 0,
      maxVal: 20,
      value: 0,
      unit: "kg",
    };
  },
  components: {
    Slider,
  },
};
</script>

<style>
</style>