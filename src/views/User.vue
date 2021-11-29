<template>
<div class="entryID">
<h1>Lets GO!</h1>
<div class="boxA">    
<label for="pollId" class="start_buttons">Poll-ID</label><br>
<input type="text" style="font-size:1.4em" id="pollId" v-model="pollId" required="required" placeholder="Input the poll-Id">
</div>
<br><br><br><br>
<div class="boxB">
<label for="" class="start_buttons">Username</label><br>
<input type="text" style="font-size:1.4em" id="userName" v-model="userName" required="required" placeholder="Input your username">
</div>
<div class="boxC">
<router-link v-bind:to="'/poll/'+pollId" tag="button"><v-btn class="start_buttons">Join GeoQuiz!</v-btn></router-link>
</div>
</div>
</template>

<script>
export default {
  name: 'User',
  data: function () {
    return {
      pollId:""
     }
  }
}
</script>

<style>
.entryID {

  display: grid;
  grid-gap:5%;
  justify-content: center;
  width: 100vw;


  /* align-content: space-between; */
}
.boxA{
    grid-row:2;
    width:50vh;
}
.boxB{
    grid-row:3;
}
.boxC{
    grid-row:4;
}
h1{
  color:black;
}
</style>