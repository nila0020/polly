<template>
  <!-- <div id="nav">
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    <label>
      Write poll id: 
      <input type="text" v-model="id">
    </label>
    <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>
  </div> -->

<header>
 <img src="img\test.png" alt="" style="width:100%; height: 200px;margin-left:10px; float:left;">
</header>

<section id = "page" >
  <header id="header" style="margin-bottom:100px; padding-right:150px; ">
    <img src="img\PngItem_2939510.png" alt="" style="width:150px; margin-left:10px; float:left;">
    <h1>{{uiLabels.welcomeText}}</h1>

  </header>

  <h3>{{uiLabels.Choose}}</h3>
  <!-- <img src="https://rymdcenter.se/wp-content/uploads/2020/01/m82-hst-karusell.jpg" alt="alt text"/> -->
<!-- Knappar för startsidan -->
<div class = "container">
      <!-- Knapp till Usersidan -->
      <router-link v-bind:to="'/poll/'"><v-btn outline block class="start_buttons"><span class="text">{{uiLabels.User}}</span></v-btn></router-link>
      <!-- Knapp till creators överblick -->
      <router-link v-bind:to="'/Creator_overlook/'+lang"><v-btn outline block class="start_buttons"><span class="text">{{uiLabels.Creator}}</span></v-btn></router-link>
</div>
  <br>
  <button id="langButton" class ="langButton" v-on:click="switchLanguage" > <div>{{uiLabels.changeLanguage}} </div> <img v-bind:src="uiLabels.imgLanguage"  height="70" width="140" alt=""></button>

</section>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Start',
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
      console.log(this.uiLabels)
    }
  }
}
</script>
<style>

#page {
  background-color: white;
  margin-top:50px;
  font-size: 16pt;
  font-family: 'Archivo Black', sans-serif;
  padding-bottom:100px;
  padding-top:50px;
}


#header{
  background-color: white;
  font-size: 40pt;
  text-align:center;
  padding-left: 30px;
  font-size: 40pt;
  text-align: center;
  color:black;
}


.container {
  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  justify-content: space-around;
  /* align-content: space-between; */
}

.start_buttons {
  align-items: center;
  background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #FFFFFF;
  display: flex;
  font-family: Phantomsans, sans-serif;
  font-size: 20px;
  justify-content: center;
  line-height: 2em;
  max-width: 100%;
  min-width: 140px;
  padding: 3px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}

.start_buttons:active,
.start_buttons:hover {
  outline: 0;
}

.start_buttons span {
  background-color: rgb(5, 6, 45);
  padding: 16px 24px;
  border-radius: 6px;
  width: 100%;
  height: 45%;
  transition: 300ms;
}

.start_buttons:hover span {
  background: none;
}

#langButton {
  align-items: center;
  padding: 0;
  cursor: pointer;

}
.langButton:hover {
  filter: brightness(130%);
}


@media (min-width: 768px) {
  .start_buttons {
    font-size: 24px;
    min-width: 196px;
  }
}</style>