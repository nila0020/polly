<template>
  <div class="fullFrame">
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
    <div v-if="confirmedUser && activeGame">
      <div v-show="!activeQuestion">
        <div v-show="activeGame">
          <button v-on:click="activateQuestion">question!</button>
        </div>
        <div class="centrera">
          <div class="wrapper">
            <div class="navBar">{{ gameId }}</div>
            <div class="mapWrap">
              <div class="map">
                <Maps />
              </div>
            </div>
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
    <div v-show="!activeGame && confirmedUser" class="scoreBoards">
      här kommer det dyka upp scoreboards och skoj
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from "@/components/Question.vue";
import Maps from "@/components/Maps.vue";
import io from "socket.io-client";
const socket = io();
export default {
  name: "Game",
  components: {
    Question,
    Maps,
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
      amountOfQuestions: 0,
      qId: 0,
    };
  },
  created: function () {
    this.gameId = this.$route.params.id;
    socket.on("newQuestion", (q) => (this.question = q));
  },
  methods: {
    submitAnswer: function (answer) {
      if ("MCQ" == this.question[0]["type"]) {
        if (answer == this.question[0]["a"][0][this.question[0]["a"][1]]) {
          console.log("sann");
          answer = true;
        } else {
          console.log("faslk");
          answer = false;
        }
      } else {
        if (
          answer < this.question[0]["aS"][3][2] &&
          answer > this.question[0]["aS"][3][0]
        ) {
          answer = true;
        } else {
          answer = false;
        }
      }
      socket.emit("submitAnswer", {
        gameId: this.gameId,
        answer: answer,
        userName: this.userName,
      }); /*avgör om det finns fler frågor eller om quizzet skall avslutas*/
      if (this.question[0]["qId"] < this.question[1]) {
        console.log("detta är frågeId " + this.qId);
        this.qId += 1;
        /*nedan uppdaterar vi frågeobjektet via sockets via data*/
        socket.emit("runQuestion", {
          gameId: this.gameId,
          questionNumber: this.qId,
        });
      } else {
        console.log("i scoreboard i submitanswerpoll elsesats");
        socket.emit("scoreBoard", {
          gameId: this.gameId,
          userName: this.userName,
        });
        this.activeGame = false;

        /*drawScoreboard();*/
      }

      this.activeQuestion = false;
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
.centrera {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.wrapper {
  display: grid;
  width: 100%;
  max-width: 65vh;
  height: 98vh;
  grid-template-rows: 1fr 9fr;
  grid-gap: 3px;
  background-color: white;
  color: black;
  overflow: hidden;
  border-radius: 12px;
}

.navBar {
  grid-column: 1;
  grid-row: 1;
  color: white;
  width: 100%;
  background-color: rgb(0, 128, 17);
}
.mapWrap {
  overflow: hidden;
}
.questionDisplayed {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
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