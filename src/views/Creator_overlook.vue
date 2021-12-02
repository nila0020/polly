<template>
    <section class = "container">
      <!--Title box-->
      <div class="box titleBox" >
<<<<<<< HEAD
        <h3>titleBox</h3>
        <input type="text" v-model="GameName" placeholder="Game name">
=======
        <h3>Game Title and GameID</h3>
<<<<<<< HEAD
        <div class="insertTitle">
        <label for = "gameName">Game name: </label>
        <input type="text" id = "gameName" v-model="pollName" placeholder="Enter Game name"><br>
        <label for = "gameID">GameID: </label>
        <input type="text" id = "gameID" v-model="pollId" placeholder="Enter Game ID"><br><br>
        <button class = "createButton" v-on:click="createPoll">
          Create Game
=======
        <input type="text" v-model="pollName" placeholder="Game name">
>>>>>>> 8332910894f9a1ce8836ebf27a6b8ede4e32cb44
        <input type="text" v-model="pollId" placeholder="Game ID">
        <button v-on:click="createGame">
          Create game
>>>>>>> 6d992c5bb25fbce2e4efa9ad19bcea563f57f0e0
        </button>
        </div>
      </div>

      <!--Overlook box-->
      <div class="box Overlook" >
          <h1>Overlook</h1>

        <!--Add new questions and list them-->
        <div id="overlookList">
          <ul class="list-unstyled">
            <li v-bind:key="question" v-for="question in questions">
              <label>
                {{question.text}}
              </label>
            </li>
          </ul>
          <p>
            <input type="text" v-model="questionText" placeholder="add new question here" />
            <button v-on:click="addQuestion()" class="btn btn-primary btn-sm">Add question</button>
          </p>
        </div>
      </div>

      <!--Center box-->
      <div class="box centerBox">

        <!--Info box-->
          <div class="box info" v-on:click="expand">
            <h1>info</h1>
            <input type="text" v-model="info" placeholder="information about the question">
          </div>

        <!--Question box-->
          <div class="box questionBox">
            <h1>questionBox</h1>
            <input type="text" v-model="question" placeholder="Question">
            <div>
              Answers:
              <input v-for="(_, i) in answers"
                     v-model="answers[i]"
                     v-bind:key="'answer'+i">
              <button v-on:click="addAnswer">
                Add answer alternative
              </button>
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
    </section>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  data: function () {
    return {
      questionText: '',
      questions: [],
      info: "",
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {}
    }
  },
  created: function () {
    //this.lang = this.$route.params.lang;
    //socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
        this.data = data
    )
    socket.on("pollCreated", (data) =>
        this.data = data)
  },
  methods:{
    expand: function() {
      console.log("INFO")
    },
    createGame: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
    addQuestion: function() {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
      var newTodo = this.questionText.trim();
      if (!newTodo) {return;}
      this.questions.push(
          {text: newTodo, done: false}
      );
      this.questionText = '';
    },
    addAnswer: function () {
      this.answers.push("");
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
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
    font-family: 'Times New Roman', Times, serif;

}

.container {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 140px 400px 400px;

}
.box  {
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
  grid-column: 1/ span 4;
  grid-row: 1;
  
}
.Overlook {
  grid-column: 1;
  grid-row: 2/ span 2;
}
.centerBox {
  grid-column: 2;
  grid-row: 2/ span 2;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  background-color: lightslategray;
}
.toolBox {
  grid-column: 3;
  grid-row: 2/ span 2;
}
.info {
  grid-column: 1;
  grid-row: 1;
}
.questionBox {
  grid-column: 2;
  grid-row: 1;
}
.map {
  grid-column: 1 /span 2;
  grid-row: 2;
}
.createButton {
  float:right;
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
