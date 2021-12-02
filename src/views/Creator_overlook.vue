<template>
    <section class = "container">
      <!--Title box-->
      <div class="box titleBox" >
        <h3>titleBox</h3>
        <input type="text" v-model="GameName" placeholder="Game name">
        <input type="text" v-model="pollId" placeholder="Game ID">
        <button v-on:click="createGame">
          Create game
        </button>
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
</style>
