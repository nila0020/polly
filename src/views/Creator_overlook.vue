<template>
    <section class = "container">
      <div class="box titleBox" >
        <h3 style="float:left">titleBox</h3>
        <input type="text" v-model="question" >
      </div>
      <div class="box Overlook" >
          <h1>Overlook</h1>
      </div>
      <div class="box centerBox">
          <div class="box info" v-on:click="expand">
            <h1>info</h1>
          </div>
          <div class="box questionBox">
            <h1>questionBox</h1>
          </div>
          <div class="box map">
            <h1>map</h1>
          </div>
      </div>
      <div class="box toolBox">
      <h1>toolBox</h1>
    </div>
    </section>

<div >
    <h3>Your destinations</h3>
</div>

</template>

<script>
export default {
  methods:{
    expand: function() {
      console.log("INFO")
      this.addClass('expand')
    }
  }
}

/*$(document).ready(function () {
  $("#wrapper div").click(function () {
    if ($(this).siblings().hasClass('expanded')) {
      $(this).siblings().removeClass('expanded');
    }
    $(this).addClass('expanded');
  });
});*/
</script>

<style>
#header h1 {
    font-family: 'Times New Roman', Times, serif;

}

.container {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 140px 400px 400px;

}
.box  {
  background-color: #444;
  color: #fff;
  border-radius: 5px;
  margin: 5px;
  padding: 20px;
  font-size: 150%;
}
.titleBox {
  grid-column: 1/ span 4;
  grid-row: 1;
}
.Overlook {
  grid-column: 1;
  grid-row: 2/ span 2;
}
.centerBox {
  grid-column: 2;
  grid-row: 2/ span 2;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  background-color: lightslategray;
}

.toolBox {
  grid-column: 3;
  grid-row: 2/ span 2;
}
.info {
  grid-column: 1;
  grid-row: 1;
}
.questionBox {
  grid-column: 2;
  grid-row: 1;
}
.map {
  grid-column: 1 /span 2;
  grid-row: 2;
}
</style>
