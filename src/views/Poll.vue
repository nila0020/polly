<template>
  <div class="fullFrame">
    <div v-show="!confirmedUser" class="entryId">
      <h1>{{ this.uiLabels.letsGo }}</h1>
      <div class="boxA">
        <label for="gameId" class="start_buttons1">Poll-ID</label><br />
        <input
          type="text"
          id="gameId"
          v-model="gameId"
          required="required"
          v-bind:placeholder="this.uiLabels.enterGameID"
        />
      </div>
      <div class="boxB">
        <label for="" class="start_buttons1">{{ uiLabels.username }}</label
        ><br />
        <input
          type="text"
          style="font-size: 1.4em"
          id="userName"
          v-model="userName"
          required="required"
          v-bind:placeholder="this.uiLabels.enterUsername"
        />
      </div>
      <div class="boxC">
        <v-btn class="start_buttons" id="joinknapp" v-on:click="confirmUser"
          ><span>{{ this.uiLabels.join }}</span></v-btn
        >
        <v-btn class="start_buttons" id="viewResults" v-on:click="showResult"
          ><span>{{ this.uiLabels.result }}</span></v-btn
        >
      </div>
      <div class="picture">
        <img src="/img/clouds.PNG" />
      </div>
    </div>

    <div
      v-if="confirmedUser && activeGame && !tutorialBox"
      v-show="confirmedUser && activeGame && !tutorialBox"
    >
      <div v-show="!activeQuestion">
        <button v-on:click="activateQuestion">fråga</button>

        <div class="centrera">
          <div class="wrapper">
            <div class="navBar">
              <button
                id="quitButton"
                class="create_buttons"
                v-on:click="quitGame"
              >
                {{ uiLabels.quit }}
              </button>
              <div id="gameName">{{ gameName }}</div>
              <div id="gameId">Game ID:{{ gameId }}</div>
            </div>
            <div class="mapWrap">
              <div class="map" v-if="this.question[0].pos">
                <Maps
                  :qLat="this.question[0].pos[0]"
                  :qLong="this.question[0].pos[1]"
                  :gameId="this.gameId"
                />
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
    <div
      v-if="confirmedUser && activeGame"
      v-show="confirmedUser && activeGame && tutorialBox"
      v-on:click="tutorialMethod"
      class="tutorialBox"
    >
      <h4>{{ uiLabels.tutorial1 }}</h4>
      {{ uiLabels.tutorial2 }}<br />
      {{ uiLabels.tutorial3 }}<br />
      {{ uiLabels.tutorial4 }}<br />
      {{ uiLabels.tutorial5 }}<br />
      {{ uiLabels.tutorial6 }}
    </div>
    <div
      v-show="!activeGame && confirmedUser && this.scoreBoard"
      class="scoreBoards"
    >
      <Bars
        :scoreBoard="scoreBoard"
        v-if="!activeGame && this.scoreBoard"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from "@/components/Question.vue";
import Maps from "@/components/Maps.vue";
import Bars from "@/components/Bars.vue";
import io from "socket.io-client";
const socket = io();
export default {
  name: "Game",
  components: {
    Question,
    Maps,
    Bars,
  },
  data: function () {
    return {
      question: {
        type: "",
        pos: [],
        q: "",
        a: [],
        info: "",
        pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Uppsala_Cathedral_in_February.jpg/1920px-Uppsala_Cathedral_in_February.jpg",
      },
      gameId: null,
      gameName: null,
      gameExists: [false, true],
      confirmedUser: false,
      userName: "",
      activeQuestion: false,
      activeGame: true,
      amountOfQuestions: 0,
      qId: 0,
      scoreBoard: null,
      uiLabels: {},
      poll: true,
      viewResult: false,
      tutorialBox: true,
    };
  },

  created: function () {
    this.gameId = this.$route.params.id;
    this.lang = this.$route.params.lang;
    this.gameName = this.$route.params.name;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("GameIdExists", (q) => {
      this.gameExists = q;
      if (!this.gameExists[0]) {
        console.log("1", this.gameExists);
        alert("Please provide a valid GameId");
      }
      if (this.gameExists[0] && this.gameExists[1]) {
        console.log("2");
        alert("Username has already been taken");
      }
      if (this.gameExists[0] && !this.gameExists[1]) {
        console.log("3");
        this.confirmedUser = true;
        socket.emit("joinGame", this.gameId, this.qId, this.userName);
      }
    });
    socket.on("gameName", (q) => (this.gameName = q));
    socket.on("newQuestion", (q) => (this.question = q));
    socket.on("newScoreboard", (q) => (this.scoreBoard = q));
    socket.on("withinRange", (d) => (this.activeQuestion = d.activeQuestion));
  },
  methods: {
    submitAnswer: function (answer) {
      let corAnswer = null;
      if ("MCQ" == this.question[0]["type"]) {
        if (answer == this.question[0]["a"][0][this.question[0]["a"][1]]) {
          corAnswer = true;
        } else {
          corAnswer = false;
        }
      } else {
        if (
          answer < this.question[0]["aS"][3][2] &&
          answer > this.question[0]["aS"][3][0]
        ) {
          corAnswer = true;
        } else {
          corAnswer = false;
        }
      }
      socket.emit("submitAnswer", {
        gameId: this.gameId,
        answer: answer,
        corAnswer: corAnswer,
        userName: this.userName,
      }); //Determine if questions left or end
      if (this.question[0]["qId"] < this.question[1]) {
        this.qId += 1;
        // Below: update question object via sockets and data
        socket.emit("runQuestion", {
          gameId: this.gameId,
          questionNumber: this.qId,
        });
      } else {
        socket.emit("scoreBoard", {
          gameId: this.gameId,
          userName: this.userName,
        });
        this.activeGame = false;
      }

      this.activeQuestion = false;
    },
    tutorialMethod: function () {
      this.tutorialBox = false;
    },
    confirmUser: function () {
      if (!this.gameId || !this.userName) {
        alert("Please enter a gameId and/or a password");
      } else {
        console.log("användarinformation ", this.gameId, this.userName);
        console.log(this.question);
        socket.emit("doesGameIdExist", {
          gameId: this.gameId,
          userName: this.userName,
        });
      }
    },
    showResult: function () {
      if (!this.gameId) {
        alert("Please enter a gameId");
      } else {
        this.poll = false;
        this.viewResult = true;
        console.log("viewResult:", this.viewResult);
        console.log("scoreboard:", this.scoreBoard);
        console.log("poll:", this.poll);
        socket.emit("scoreBoard", {
          gameId: this.gameId,
          userName: this.userName,
        });
        this.activeGame = false;
        console.log("activeGame", this.activeGame);
      }
    },
    quitGame: function () {
      this.confirmedUser = false;
    },
    activateQuestion: function () {
      this.activeQuestion = true;
    },
  },
};
</script>
<style scoped>
.tutorialBox {
  display: grid;
  color: black;
  background: linear-gradient(#17b27f, #319881, #2ab0b4, #3096c2);
  border: 10px;
  border-radius: 1em;
  width: 55vh;
  height: 98vh;
  justify-content: center;
  font-size: 1.3em;
  font-family: "Baloo Bhaijaan 2", cursive;
}

.fullFrame {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
label {
  font-size: 24px;

  font-family: "Baloo Bhaijaan 2", cursive;
  color: white;
}
.picture {
  width: 100vw;
  object-fit: contain;
}
img {
  max-width: 100%;
}
.centrera {
  display: flex;
  flex-direction: center;
  justify-content: center;
}
.wrapper {
  padding: 0.3em;
  box-sizing: border-box;
  display: grid;
  max-width: 65vh;
  height: 100vh;
  grid-template-rows: 1fr 9fr;
  background-color: white;
  color: black;
  border-radius: 12px;
}

.navBar {
  font-family: "Baloo Bhaijaan 2", cursive;
  grid-column: 1;
  grid-row: 1;
  color: white;
  width: 100%;
  justify-items: center;
  align-items: center;
  background-color: rgb(5, 177, 25);
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}
.mapWrap {
  overflow: hidden;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
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
  height: 100vh;
  grid-template-rows: 20% 20% 23%;
  background: linear-gradient(#17b27f, #319881, #2ab0b4, #3096c2);
  font-family: "Baloo Bhaijaan 2", cursive;
  justify-items: center;
  justify-content: center;
}
input {
  border-radius: 2em;
  width: 75vw;
  max-width: 75vh;
  border-width: 3px;
  font-size: 1.4em;
  color: white;
  border-color: white;
  background-color: black;
  font-family: "Baloo Bhaijaan 2", cursive;
}
#joinknapp {
  max-width: 77vh;
  width: 75vw;
  font-family: "Baloo Bhaijaan 2", cursive;
  margin-bottom: 5px;
}

#viewResults {
  max-width: 77vh;
  width: 75vw;
  font-family: "Baloo Bhaijaan 2", cursive;
  margin-bottom: 5px;
}

#quitButton {
  border-radius: 8px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: "Baloo Bhaijaan 2", cursive;
  font-size: 12px;
  justify-content: center;
  line-height: 2em;
  max-width: 100%;
  min-width: 60px;
  padding: 3px;
  text-decoration: underline;
  text-decoration-color: black;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
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