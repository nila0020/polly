<template>
    <section class = "container">
      <div class="box titleBox">
        <h1>titleBox</h1>
      </div>

      <div class="box Overlook">
          <h1>Overlook</h1>
      </div>
      <div class="box info">
        <h1>info</h1>
      </div>
      <div class="box questionBox">
        <h1>questionBox</h1>
      </div>
      <div class="box toolBox">
      <h1>toolBox</h1>
      </div>
      <div class="box map">
        <h1>map</h1>
      </div>
    </section>
    
<div >
    <h3>Your destinations</h3>
</div>

</template>

<script>
</script>

<style>
#header h1 {
    font-family: 'Times New Roman', Times, serif;

}

.container {
  display: grid;
  grid-template-columns: 15% 35% 35% 15%;
  grid-template-rows: 200px 400px 400px;

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
.info {
  grid-column: 2;
  grid-row: 2;
}
.questionBox {
  grid-column: 3;
  grid-row: 2;
}
.toolBox {
  grid-column: 4;
  grid-row: 2/ span 2;
}
.map {
  grid-column: 2 /span 2;
  grid-row: 3;
}
</style>
