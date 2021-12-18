<!-- Man passar in parametrarna min, max och unit via bindning i objektaggen
på template i filen som skall använda componenten, t.ex. 
  <Slider :min="minVal" :max="maxVal" :unit="unit" />
och gör importen: 
import Slider from "@/components/Slider.vue"; 
i scriptet på filen som använder komponenten -->
<template>
  <div>
    <div>
      <Slider
        v-if="!poll"
        v-model="value"
        :min="this.min"
        :max="this.max"
        v-on:click="showValue"
      />
      <Slider
        v-if="poll"
        v-model="valuePoll"
        :min="this.min"
        :max="this.max"
        v-on:click="showValue"
      />
    </div>
    <div v-if="!poll" class="output">{{ this.value }} {{ this.unit }}</div>
    <div v-if="poll" class="output">{{ this.valuePoll }} {{ this.unit }}</div>

    <!-- <div class="output">
      The lowest acceptable answer is: {{ this.value[0] }} {{ this.unit }}
    </div>
    <div class="output">
      The actual answer is: {{ this.value[1] }} {{ this.unit }}
    </div>
    <div class="output">
      The highest acceptable answer is: {{ this.value[2] }} {{ this.unit }}
    </div> -->
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
      valuePoll: [0],
      value: [0, 10, 20],
    };
  },
  methods: {
    showValue: function () {},
  },
};
</script>
<style src="@vueform/slider/themes/default.css">
</style>