<template>
  <Slider
    :poll="true"
    v-model="aS[3][1]"
    :min="aS[3][0]"
    :max="aS[2]"
    :unit="aS[0]"
  />
</template>

<script>
import Slider from "@/components/Slider.vue";
export default {
  name: "User",
  data: function () {
    return {
      aS: ["cm", 10, 20, [-5, 16, 20]],
    };
  },
  components: {
    Slider,
  },
};
</script>

<style>
</style>