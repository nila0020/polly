<template>
<div class="entryID">
<div>    
<label for="pollId">Poll-Code</label><br>
<input type="text" id="pollId" v-model="pollId" required="required" placeholder="Write your pollId here">
</div>
<br><br><br><br>
<div>
<label for="">Username</label><br>
<input type="text" id="userName" v-model="userName" required="required" placeholder="Write your username here">
</div>
<router-link v-bind:to="'/poll/'+pollId" tag="button"><v-btn class="start_buttons">Join GeoQuiz!</v-btn></router-link>
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
  
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  justify-content: space-evenly;

  /* align-content: space-between; */
}
</style>