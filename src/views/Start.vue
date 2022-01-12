<template>

  <section class="page">
    <header id="header">
      <h1>GeoQuiz <img src="/img/mappe.png" style="width: 9vw" /></h1>
    </header>

    <h1>{{ uiLabels.welcomeText }}</h1>

    <h3>{{ uiLabels.Choose }}</h3>

    <!-- Start page buttons -->
    <div class="container">
      <!-- User page button -->
      <router-link v-bind:to="'/poll/' + lang"
        ><v-btn outline block class="start_buttons"
          ><span class="text">{{ uiLabels.User }}</span></v-btn
        ></router-link
      >
      <!-- Creator overlook button-->
      <router-link v-bind:to="'/Creator_overlook/' + lang"
        ><v-btn outline block class="create_buttons"
          ><span class="text">{{ uiLabels.Creator }}</span></v-btn
        ></router-link
      >
    </div>
    <br />
    <div class="row">
      <div class="column">
        <img
          class="desktop-only"
          src="/img/pngwing.png"
          style="
            width: 600px;
            opacity: 0.7;
            margin-left: -3pt;
            margin-bottom: -42pt;
            display: inline;
          "
        />
      </div>
      <div class="column">
        <button id="langButton" class="langButton" v-on:click="switchLanguage">
          <div>{{ uiLabels.changeLanguage }}</div>
          <img
            v-bind:src="uiLabels.imgLanguage"
            height="70"
            width="140"
            alt=""
          />
        </button>
      </div>
      <div class="column">
        <img
          class="desktop-only"
          src="/img/road.png"
          style="
            width: 200px;
            opacity: 0.7;
            margin-bottom: -42pt;
            overflow: hidden;
            display: inline;
          "
        />
      </div>
    </div>
  </section>
</template>

<script>
import io from "socket.io-client";
const socket = io();

export default {
  name: "Start",
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
    };
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
    switchLanguage: function () {
      if (this.lang === "en") this.lang = "sv";
      else this.lang = "en";
      socket.emit("switchLanguage", this.lang);
      console.log(this.uiLabels);
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@800&family=Lilita+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap");

body {
  min-height: 100vh;
}

html {
  overflow-y: scroll;
  height: 100%;
}

.page {
  background: linear-gradient(#b6d7a8ff, #b6d7a8ff, #1d7658, #105646);
  text-align: center;
  font-family: "Baloo Bhaijaan 2", cursive;
  font-size: 20pt;
  color: black;
  padding-bottom: 50px;
  padding-top: 1px;
}

#header {
  background-color: #b6d7a8ff;
  color: #1d7658;
  font-family: "Luckiest Guy", cursive;
  font-size: 3.8vw;
  justify-content: center;
  text-shadow: 5px 5px #000000;
}
.row {
  display: flex;
}

.column {
  flex: 33.33%;
  padding: 5px;
}

.desktop-only {
  display: block !important;
}
@media screen and (max-width: 600px) {
  .desktop-only {
    display: none !important;
  }
  #header {
    font-size: 25pt;
  }
  .page {
    font-size: 18pt;
  }

  .langButton {
    text-align: center;
  }
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  justify-content: space-around;
}

.start_buttons {
  align-items: center;
  background-image: linear-gradient(144deg, #65be51, #126514 50%, #65be51);
  border: 0;
  border-radius: 8px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: "Baloo Bhaijaan 2", cursive;
  font-size: 20px;
  justify-content: center;
  line-height: 2em;
  max-width: 100%;
  min-width: 140px;
  padding: 3px;
  text-decoration: underline;
  text-decoration-color: #65be51;
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
  background-color: #65be51;
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
.create_buttons {
  align-items: center;
  background-image: linear-gradient(144deg, #fa628d, #881d33 50%, #fa628d);
  border: 0;
  border-radius: 8px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: "Baloo Bhaijaan 2", cursive;
  font-size: 20px;
  justify-content: center;
  line-height: 2em;
  max-width: 100%;
  min-width: 140px;
  padding: 3px;
  text-decoration: underline;
  text-decoration-color: #c92553;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}

.create_buttons:active,
.create_buttons:hover {
  outline: 0;
}

.create_buttons span {
  background-color: #c92553;
  padding: 16px 24px;
  border-radius: 6px;
  width: 100%;
  height: 45%;
  transition: 300ms;
}

.create_buttons:hover span {
  background: none;
}

@media (min-width: 768px) {
  .start_buttons {
    font-size: 24px;
    min-width: 196px;
  }
  .create_buttons {
    font-size: 24px;
    min-width: 196px;
  }
  #langButton {
    margin-left: -140pt;
  }
}
</style>
