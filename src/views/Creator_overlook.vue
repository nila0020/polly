<template>
<section>
  <section class="box titleBox">
    <!--Title box-->

    <h3>Game Title and GameID</h3>

    <div class="insertTitle">
      <label for="gameName">{{uiLabels.gameName}}: </label>
      <input
        type="text"
        id="gameName"
        v-model="pollName"
        placeholder="Enter Game name"
      /><br />
      <label for="gameID">Game ID: </label>
      <input
        type="text"
        id="gameID"
        v-model="pollId"
        placeholder="Enter Game ID"
      /><br />
      <button class="createButton" v-on:click="createPoll">Create Game</button>
    </div>
  </section>

  <section class="container">
    <!--Overlook box-->
    <div class="box Overlook" >
      <h1>Overlook</h1>

        <!--Add new questions and list them-->
        <div id="overlookList">
          <ul class="list-unstyled">
            <li v-bind:key="question" v-for="question in questions">
              <label>
                {{question.text}}{{question.answers}}
               
              </label>
            </li>
          </ul>
          <p>
            <!-- <input type="text" v-model="questionText" placeholder="add new question here" /> Detta är inputrutan i overlook -->
            <button class="overlookBtn">Add question</button>
            <button class="overlookBtn">Delete question</button>
          </p>
        </div>
        <button class = "createButton" v-on:click="addQuestion">
          Start Game
          </button>
    </div>
    <!--Center box-->
    <div class="box centerBox">

      <!--Info box-->
      <div class="box info" v-on:click="expand">
        <h1>Info</h1>
        <input class = "infoArea" type="text" v-model="info" placeholder="Question discription">
      </div>

        <!--Question box-->
          <div class="box questionBox">
            <h1>Create your question here</h1>
            <input type="text" v-model="question" placeholder="Add question">
            
            <div>
                 
              <h1>Answers:</h1>
              <input v-for="(_, i) in answers"
                     v-model="answers[i]"
                     v-bind:key="'answer'+i" placeholder="Add answer">
              <button v-on:click="addAnswer">
                Add answer alternative
              </button><br>
              <input type="number" v-model.number = "questionNumber" placeholder="Choose a question nr">
              
              <button v-on:click="[addOverlook(), runQuestion()]">
              Add question
            </button>
            <!-- <input type="number" v-model="questionNumber"> // Denna funktionalitet ska in i en Start Game-knapp då det skickar frågan till Poll
            <button v-on:click="runQuestion">
              Run question
            </button> -->
        </div>
      </div>

      <!--Map box-->
      <div class="box map">
        <h1>map</h1>
      </div>
    </div>

    <!--Tool box-->
    <div class="box toolBox">
      <h1>toolBox</h1>
    </div>

    <div class="blocker" v-if="showAll">
      <!-- blocks part of the screen -->
    </div>
  </section>
</section>
</template>

<script>
import io from "socket.io-client";
const socket = io();

export default {
  data: function () {
    return {
      questionText: "", // detta är textrutan i overlook - Den funktionen ska vara i questionbox
      questions: [],
      info: "",
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      showAll: true,
    };
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
        this.data = data
    )
    socket.on("pollCreated", (data) =>
        this.data = data)
  },
  methods: {
    createPoll: function () {
      this.showAll = false;
      socket.emit("createPoll", { pollId: this.pollId, lang: this.lang });
    },
    expand: function () {
      console.log("INFO");
    },
    createGame: function () {
      socket.emit("createPoll", { pollId: this.pollId, lang: this.lang });
    },
   
  
    addQuestion: function() {
       //Ska inte skickas förrän alla frågor lagts till
      socket.emit("addQuestion", {pollId: this.pollId, q: this.questions, a: this.answers, info: this.info, questionNumber: this.questionNumber } )
      
    },
    addOverlook: function () {
      // <router-link to="Creator_overlook"><v-btn outline block class="start_buttons"><span class="text">
      var newQuestion = this.question.trim();
      if (!newQuestion) {return;}
      this.questions.push(
          {text: newQuestion, done: false, answers: this.answers, questionNumber: this.questionNumber}
      );
      this.question = '';
      this.answers = ["", ""];
      
      
    },
    addAnswer: function () {
      this.answers.push("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {
        pollId: this.pollId,
        questionNumber: this.questionNumber,
      });
    },
  },
};
/*$(document).ready(function () {
  $("#wrapper div").click(function () {
    if ($(this).siblings().hasClass('expanded')) {
      $(this).siblings().removeClass('expanded');
    }
    $(this).addClass('expanded');
  });
});*/
</script>

<style>
#header h1 {
  font-family: "Times New Roman", Times, serif;
}
.container {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 50% 50%;
}
.blocker {
  grid-column: 1/ span 3;
  grid-row: 1/ span 2;
  overflow: hidden;
  background-color: black;
  opacity: 80%;
}
.box {
  background-color: #444;
  color: #fff;
  border-radius: 5px;
  margin: 5px;
  padding: 20px;
  font-size: 150%;
}
.insertTitle {
  float: right;
}
.titleBox h3 {
  float: left;
}
.titleBox {
  height: 140px;
}
.Overlook {
  grid-column: 1;
  grid-row: 1 / span 2;
}
.centerBox {
  grid-column: 2;
  grid-row: 1 / span 2;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  background-color: lightslategray;
}
.toolBox {
  grid-column: 3;
  grid-row: 1 / span 2;
}
.info h1 {
  font-size: 25px;
}
.info {
  grid-column: 1;
  grid-row: 1;
  overflow:scroll;
}
.infoArea {
  width: 100%;
  height: 255px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #444;
  resize: none;
  color: white;
}
.questionBox {
  grid-column: 2;
  grid-row: 1;
  overflow:scroll;
}
.questionBox h1 {
  font-size: 15px;
  grid-column: 2;
  grid-row: 1;
}
.map {
  grid-column: 1 / span 2;
  grid-row: 2;
}
.createButton {
  float: right;
  align-items: center;
  background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
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

.createButton:active,
.createButton:hover {
  outline: 0;
}

.createButton span {
  background-color: rgb(5, 6, 45);
  padding: 16px 24px;
  border-radius: 6px;
  width: 100%;
  height: 45%;
  transition: 300ms;
}

.createButton:hover span {
  background: none;
}

@media (min-width: 768px) {
  .createButton {
    font-size: 10px;
    min-width: 90px;
  }
}
</style>
