<template>
  <div v-show="!confirmedUser" class="entryId">
    <h1>Lets GO!</h1>
    <div class="boxA">
      <label for="pollId" class="start_buttons1">Poll-ID</label><br />
      <input
        type="text"
        id="pollId"
        v-model="pollId"
        required="required"
        placeholder="Input the poll-Id"
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
     <!-- {{question}} -->
  </div>
     
  <section class="overview">

   
      <div class="questions">
        <Question v-bind:question="question"
                  v-on:answer="submitAnswer"/>
      </div>
  

  <div class="wrapper">
   <div class="box a start_buttons1"> {{pollId}}</div>
   
   <div class="box b" >
   <div class="wrapmap">
      <div id="map">
      </div>
      </div>
   </div>
   
 </div>
{{question}}

 </section>
  <section class="activeQuestion">
    <!--först ta reda på vilken frågetyp det är
        ha metoder för att rita upp varje frågetyp
        ex
        on:click -> display:true ->,
        showquestion(q): if q.type==slide-> slidequestion(q), if q.type==multiplechoice->multiplechoice(q)
        
Hur frågeobjektet bör se ut ungefär: 
Question:{
  this.type=multiplechoice,               (fleralternativfråga, slide osv?, indikator för css)
  this.pos={longitude latitude},
  this.order=11,
  this.q= frågan
  this.a=alternativ a
  this.b=alternativ b
  this.antalAlternativ=5;
  ...
  this.pic=url
  this.correctAnswer=1300               (alternativ eller värde beroende på frågetyp)
  }}
--></section>
</template>

<script>
// @ is an alias to /src
import Question from "@/components/Question.vue";
import io from "socket.io-client";
const socket = io();

export default {
  name: "Poll",
  components: {
    Question,
  },
  data: function () {
    return {
      question: {
        q: "",
        a: [],
        info: "",
      },
      pollId: "inactive poll",
      confirmedUser: false,
      activeQuestion: false,
    };
  },
  created: function () {
    this.pollId = this.$route.params.id;
    socket.on("newQuestion", (q) => (this.question = q));
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", { pollId: this.pollId, answer: answer });
    },
    confirmUser: function () {
      this.confirmedUser = true;
      socket.emit("joinPoll", this.pollId);
    },
    activateQuestion: function () {
      this.activeQuestion = true;
    },
  },
};
</script>
<!--/* <<<<<<< HEAD */-->
<style>



.fullFrame{
  display:flex;
  flex-direction:row;
  overflow:hidden;
  border:0px;
  border-radius:8px;}

/*=======
<style scoped>
.fullFrame {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
>>>>>>> 2166c907b53b2f6ed12631577f026bfe213d23a5*/
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

/*<<<<<<< HEAD*/
 .a {
     grid-column: 1 ;
     grid-row:1;
     color:white;
     width:96%;
     background-color:purple;
 }
 .b {
      grid-column: 1 ;
      grid-row: 2;
      width:100vw;
 }    
.wrapmap{
  width:80%;
  height:80%;
  overflow:scroll;
/*=======
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
>>>>>>> 2166c907b53b2f6ed12631577f026bfe213d23a5*/
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