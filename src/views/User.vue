<template>
<div class="entryID">
<div>    
<label for="GameId">GameID</label><br>
<input type="text" id="gameId" v-model="gameId" required="required" placeholder="Write your GameId here">
</div>
<div>
<label for="">Username</label><br>
<input type="text" id="userName" v-model="userName" required="required" placeholder="Write your username here">
</div>
</div>
</template>

<script>
</script>

<style>
.entryID {
  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  justify-content: space-evenly;
  /* align-content: space-between; */
}
</style>