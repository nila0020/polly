<template>
  <Slider
    :poll="true"
    v-model="aS[3][1]"
    :min="aS[3][0]"
    :max="aS[2]"
    :unit="aS[0]"
  />
  <div class="center">
    <Maps />
  </div>
</template>

<script>
import Slider from "@/components/Slider.vue";
import Maps from "@/components/Maps.vue";
export default {
  name: "User",
  data: function () {
    return {
      aS: ["cm", 10, 20, [-5, 16, 20]],
    };
  },
  components: {
    Slider,
    Maps,
  },
};
</script>

<style>
.center {
  justify-content: center;
  align-content: center;
}
</style>