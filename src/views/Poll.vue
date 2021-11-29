<template>
  <div class="fullFrame">
  <div>
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>
  <div class="wrapper">
   <div class="box a start_buttons"> {{pollId}}</div>
   
   <div class="box b" >
   <div class="wrapmap">
      <div id="map">
      </div>
      </div>
   </div>
   
 </div>
 </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
const socket = io();



export default {
  name: 'Poll',
  components: {
    Question
  },
  data: function () {
    return {
      question: {
        q: "",
        a: []
      },
      pollId: "inactive poll"
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    }
  }
}
</script>
<style>
.fullFrame{
  display:flex;
  flex-direction:row;
  overflow:hidden;
  border:0px;
  border-radius:8px;}

.wrapper {
    
     display: grid;
     width: 100vw;
     height:100vh;
      grid-template-rows: 8% 88%;
      grid-gap: 2%;
      background-color: white;
      color: black;
 }

 .box {
     background-color: white;
     color: black;
     border-radius: 5px;
     padding: 0px;
     font-size: 150%;
 }

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
  width:96%;
  height:100%;
  overflow:scroll;
  position: relative;
  border:0px;
  border-radius:12px;
}
#map {
        width:1920px;
        height:1080px;
        background: url("/img/polacks.jpg");
        border:0px;
        border-radius:8px;
  }

 </style>