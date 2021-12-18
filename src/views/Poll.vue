<template>
  {{ question }}
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
    <br /><br /><br /><br />
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
</template>

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
        type: "",
        pos: "",
        q: "",
        a: [],
        info: "",
        pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Uppsala_Cathedral_in_February.jpg/1920px-Uppsala_Cathedral_in_February.jpg",
        aS: [],
      },
      gameId: "inactive game",
      confirmedUser: false,
      userName: "",
      activeQuestion: false,
      qId: 0,
    };
  },
  created: function () {
    console.log("created has been triggered in poll");
    this.gameId = this.$route.params.id;
    socket.on("newQuestion", (q) => (this.question = q));
  },
  methods: {
    submitAnswer: function (answer) {
      console.log("submitanswer: " + answer);
      socket.emit("submitAnswer", {
        gameId: this.gameId,
        answer: answer,
        userName: this.userName,
      });
      this.qId += 1;
      this.activeQuestion = false;

      /*nedan uppdaterar vi frågeobjektet via sockets via data*/
      socket.emit("runQuestion", {
        gameId: this.gameId,
        questionNumber: this.qId,
      });
    },
    confirmUser: function () {
      this.confirmedUser = true;
      socket.emit("joinGame", this.gameId, this.qId, this.userName);
    },
    activateQuestion: function () {
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
  justify-items: center;
  align-items: center;
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
  background-color: rgb(0, 128, 17);
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
  justify-content: center;
}
.entryId {
  display: grid;
  width: 100%;
  height: 100%;
  background-color: #1d7658;
  justify-content: center;
  padding-bottom: 10vw;
  padding-top: 5vw;
}
input {
  border-radius: 2em;
  width: 75vw;
  border-width: 3px;
  font-size: 1.4em;
  border-color: green;
}
#joinknapp {
  max-width: 79vw;
}
</style> 