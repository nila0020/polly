<template>
  <div v-show="!confirmedUser" class="entryId">
    <h1>Lets GO!</h1>
    <div class="boxA">
      <label for="gameId" class="start_buttons1">Poll-ID</label><br />
      <input
          type="text"
          id="gameId"
          v-model="gameId"
          required="required"
          placeholder="Input the game-Id"
      />
    </div>
    <br /><br /><br /><br />
    <div class="boxB">
      <label for="" class="start_buttons1">Username</label><br />
      <input
          type="text"
          style="font-size: 1.4em"
          id="userName"
          v-model="userName"
          required="required"
          placeholder="Input your username"
      />
    </div>
    <div class="boxC">
      <v-btn class="start_buttons" id="joinknapp" v-on:click="confirmUser"
      >Join GeoQuiz!</v-btn
      >
    </div>
  </div>
  <div v-show="confirmedUser" class="fullFrame">
    <div v-show="!activeQuestion" class="overview">
      <v-btn class="showquestion box b" v-on:click="activateQuestion"
      >question!</v-btn
      >
      <div class="wrapper">
        <div class="box a">{{ gameId }}</div>

        <div class="box b">
          <div id="map"></div>
        </div>
      </div>
    </div>
    <div v-show="activeQuestion" class="questionDisplayed">
      <Question v-bind:question="question" v-on:answer="submitAnswer" />
    </div>
  </div>

  <!--först ta reda på vilken frågetyp det är
        ha metoder för att rita upp varje frågetyp
        ex
        on:click -> display:true ->,
        showquestion(q): if q.type==slide-> slidequestion(q), if q.type==multiplechoice->multiplechoice(q)
        
Hur frågeobjektet bör se ut ungefär: 
Question:{
  this.type=multiplechoice,               (fleralternativfråga, slide osv?, indikator för css)
  this.pos={longitude latitude},
  this.info
  this.q= frågan
  this.a=[{answer:bool/value},{answer:bool/value},{answer:bool/value}] (bool eller value beroende på fråga)
  this.pic=url
  }}
frågebunten bör se ut såhär:Questions{ {1:object}, {2:object}, {3:object} }
--></template>

<script>
// @ is an alias to /src
import Question from "@/components/Question.vue";
import io from "socket.io-client";
const socket = io();
export default {
  name: "Game",
  components: {
    Question,
  },
  data: function () {
    return {
      question: {
        q: "",
        a: [],
      },
      gameId: "inactive game",
      confirmedUser: false,
      activeQuestion: false,
      qId: 0
    };
  },
  created: function () {
    console.log("created has been triggered in poll");
    this.gameId = this.$route.params.id;
    socket.on("newQuestion", (q) => (this.question = q));
    console.log(this.question);
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", { gameId: this.gameId, answer: answer });
    },
    confirmUser: function () {
      this.confirmedUser = true;
      socket.emit("joinGame", this.gameId, this.qId);
    },
    activateQuestion: function () {
      console.log("detta är objektet= " + this.question);
      this.activeQuestion = true;
    },
  },
};
</script>
<style scoped>
.fullFrame {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.wrapper {
  display: grid;
  width: 100vw;
  height: 96vh;
  grid-template-rows: 1fr 9fr;
  grid-gap: 2%;
  background-color: white;
  color: black;
}
.box {
  border-radius: 12px;
}
.a {
  grid-column: 1;
  grid-row: 1;
  color: white;
  width: 100%;
  background-color: purple;
}
.b {
  grid-column: 1;
  grid-row: 2;
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
  border: 0px;
  border-radius: 12px;
}
#map {
  width: 1920px;
  height: 1080px;
  background: url("/img/polacks.jpg");
  border: 0px;
  border-radius: 8px;
}
.questionDisplayed {
}
.entryId {
  display: grid;
  width: 100%;
  height: 100%;
  grid-gap: 5vh;
  background-color: white;
  justify-content: center;
}
input {
  border-radius: 2em;
  width: 75vw;
  border-width: 3px;
  font-size: 1.4em;
  border-color: blueviolet;
}
#joinknapp {
  max-width: 79vw;
}
</style> 