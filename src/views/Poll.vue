<template>
<<<<<<< HEAD
=======
  {{this.question[1]}}
>>>>>>> 56b6ed51439dd09bc592a29e7c24883a90c89f40
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
    <div v-show="!activeQuestion && activeGame" class="overview">
      <button
        class="showquestion box b"
        v-show="activeGame"
        v-on:click="activateQuestion"
      >
        question!
      </button>
      <div class="wrapper">
        <div class="box a">{{ gameId }}</div>

        <div class="box b">
          <div id="map"></div>
        </div>
      </div>
    </div>
    <div
      v-if="activeQuestion"
      v-show="activeQuestion"
      class="questionDisplayed"
    >
      <Question v-bind:question="question[0]" v-on:answer="submitAnswer" />
    </div>
    <div class="blockerAll" v-if="this.question == -1">
      <!-- blocks overlook, center and tool-->
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
      },
      gameId: "inactive game",
      confirmedUser: false,
      userName: "",
      activeQuestion: false,
      activeGame: true,
      qId: 0,
      amountOfquestions: Number,
    };
  },
  created: function () {
    this.gameId = this.$route.params.id;
    socket.on("newQuestion", (q) => (this.question = q));
  },
  methods: {
    submitAnswer: function (answer) {
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
      setTimeout(function () {
        if (this.question == undefined) {
          this.activeGame = false;
        }
      }, 200);
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
  height: 65vh;
  grid-template-rows: 20% 20% 23%;
  background-color: white;
  justify-content: center;
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
.blockerAll {
  grid-column: 1;
  grid-row: 2;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: black;
  opacity: 80%;
}
</style> 