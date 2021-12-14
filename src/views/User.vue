<template>
  <Slider :min="minVal" :max="maxVal" :unit="unit" />
</template>

<script>
import Slider from "@/components/Slider.vue";
export default {
  name: "User",
  data: function () {
    return {
      minVal: 10,
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