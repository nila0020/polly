<template>
  <section>
    <section class="box titleBox">
      <!--Title box-->

      <h3>Game Title and GameID</h3>

      <div class="insertTitle">
        <label for="gameName">{{ uiLabels.gameName }}: </label>
        <input
          type="text"
          id="gameName"
          v-model="gameName"
          placeholder="Enter Game name"
        /><br />
        <label for="gameID">{{ uiLabels.gameID }}: </label>
        <input
          type="text"
          id="gameID"
          v-model="gameId"
          placeholder="Enter Game ID"
        /><br />
        <button class="createButton" v-on:click="createGame">
          {{ uiLabels.CreateGame }}
        </button>
      </div>
    </section>

    <section class="container">
      <!--Overlook box-->
      <div class="box Overlook">
        <h1>Overlook</h1>
        <!--Add new questions and list them-->
        <div id="overlookList">
          <ul>
            <li v-bind:key="question" v-for="question in questions">
              <label>
                <button
                  v-on:click="
                    [currentData(question.questionNumber), closeExpand()]
                  "
                  key=""
                >
                  {{ question.questionNumber }}.{{ question.q }}
                </button>
              </label>
            </li>
          </ul>
          <p>
            <!--            <input type="text" v-model="questionText" placeholder="add new question here" /> Detta är inputrutan i overlook -->
            <button
              class="overlookBtn"
              v-on:click="[addNewQuestion(), closeExpand()]"
            >
              {{ uiLabels.Addquestion }}
            </button>
            <button class="overlookBtn">{{ uiLabels.Deletequestion }}</button>
          </p>
        </div>
        <!--        <button class = "createButton" v-on:click="addQuestion">
          Start Game
        </button>-->
      </div>
      <!--Center box-->
      <div class="box centerBox">
        <!--Info box-->
        <div
          class="box info"
          v-on:click="infoExpand"
          v-bind:class="{ infoBig: infoBig, infoSmall: infoSmall }"
        >
          <a v-on:click="closeExpand" class="closeExpand">X</a>
          <h1>Info</h1>
          <input
            class="infoArea"
            type="text"
            v-model="info"
            placeholder="{{uiLabels.Questiondiscription}}"
          />
        </div>

        <!--Question box-->
        <div
          class="box questionBox"
          v-on:click="questionExpand"
          v-bind:class="{
            questionBig: questionBig,
            questionSmall: questionSmall,
            questionSmallCond: questionSmallCond,
          }"
        >
          <input type="file" @change="onFileSelected" />
          <h1>Create your question here</h1>
          <input
            type="text"
            v-model="questionText"
            placeholder="Add question"
          />

          <div>
            <div v-if="checked === 'MCQ' || checked === null">
              <h1>Answers:</h1>
              <input
                v-for="(_, i) in answers"
                v-model="answers[i]"
                v-bind:key="'answer' + i"
                placeholder="Add answer"
              />
              <button v-on:click="addAnswer">
                {{ uiLabels.AddAnswerAlternative }}
              </button>
              <br />
            </div>
            <div v-else-if="checked === 'slider'">Här ska en slider vara</div>

            <!--            <input type="number" v-model.number = "questionNumber" placeholder="Choose a question nr">-->

            <button v-on:click="[saveQuestion()]">
              {{ uiLabels.Savequestion }}
            </button>
            <!-- <input type="number" v-model="questionNumber"> // Denna funktionalitet ska in i en Start Game-knapp då det skickar frågan till Poll
            <button v-on:click="runQuestion">
              Run question
            </button> -->
          </div>
        </div>

        <!--Map box-->
        <div
          ref="mapDiv"
          class="box map"
          v-on:click="mapExpand"
          v-bind:class="{ mapBig: mapBig, mapSmall: mapSmall }"
        >
          
          
          <div >
            
            <h4>Your Position</h4>
              Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
              {{ currPos.lng.toFixed(2) }}
          </div>
          <div>
            <h4>Clicked position</h4>
            
            <span v-if="otherPos">
              Latitude: {{otherPos.lat.toFixed(2) }}, Longitude:
              {{ otherPos.lng.toFixed(2) }}
            </span>
            <span v-else>Click the map to select a position</span>
        
        </div>
      </div>
      </div>

      <!--Tool box-->
      <div class="box toolBox">
        <h1>toolBox</h1>
        <div id="app">
          <input type="radio" id="MCQ" value="MCQ" v-model="checked" checked />
          <label for="MCQ">{{ uiLabels.MCQ }}</label>

          <br />

          <input type="radio" id="slider" value="slider" v-model="checked" />
          <label for="slider">{{ uiLabels.slider }}</label>
        </div>
      </div>

      <div class="blocker" v-if="showAll">
        <!-- blocks part of the screen -->
      </div>
    </section>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import io from "socket.io-client";
import { computed, ref, onMounted, onUnmounted} from 'vue'
import { useGeolocation } from '@/components/useGeolocation.js'
import { Loader } from '@googlemaps/js-api-loader'
const GOOGLE_MAPS_API_KEY = 'AIzaSyAkteq83ilUzPoHXC5bwzwIaWkzdZhBeeY'

const socket = io();
export default {
  
  setup() {
    const { coords } = useGeolocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))
     
    const otherPos = ref(null)
    let map = ref(null)
    let clickListener = null
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY})
    const mapDiv = ref(null)

    onMounted(async () => {
      await loader.load()
      console.log("mapDiv=", mapDiv)
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 7
       
      });
      let markerOptions = {
        position: new google.maps.LatLng(59.859799, 17.602908),
        map: map
      }
      new google.maps.Marker(markerOptions);
      clickListener = map.value.addListener(
        'click',
        ({latLng: {lat, lng }}) =>
        (otherPos.value = { lat: lat(), lng: lng() })
      )
    })
    onUnmounted(async () => {
      if (clickListener) clickListener.remove()
    })
    return { currPos, mapDiv}
  },
  data: function () {
    return {
      questionText: "", // detta är textrutan i overlook - Den funktionen ska vara i questionbox
      questions: [],
      info: "",
      lang: "",
      gameId: "",
      type: "MCQ",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      editingNumber: 0,
      selectedFile: null,
      gameName: "",
      data: {},
      uiLabels: {},
      showAll: true,
      checked: null,
      infoBig: false,
      questionBig: false,
      mapBig: false,
      infoSmall: false,
      questionSmall: false,
      mapSmall: false,
      questionSmallCond: false,
    };
  },
  
  
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("dataUpdate", (data) => (this.data = data));
    socket.on("gameCreated", (data) => (this.data = data));
  },
  
  methods: {
    onFileSelected(event) {
      console.log(event.target.files[0]);
      //this.selectedFile
    },

    createGame: function () {
      this.showAll = false;
      socket.emit("createGame", {
        gameId: this.gameId,
        lang: this.lang,
        gameName: this.gameName,
      });
    },

    addNewQuestion: function () {
      this.questionNumber++;
      this.questionText = "";
      this.answers = ["", ""];
      this.info = "";
      this.editingNumber = this.questionNumber;
      socket.emit("addQuestion", {
        gameId: this.gameId,
        type: this.type,
        pos: this.pos,
        info: this.info,
        q: this.questionText,
        a: this.answers,
        questionNumber: this.questionNumber,
        pic: this.pic,
      });
      this.questions.push({
        gameId: this.gameId,
        type: this.type,
        pos: this.pos,
        info: this.info,
        q: this.questionText,
        a: this.answers,
        questionNumber: this.questionNumber,
        pic: this.pic,
      });
      console.log(this.questions);
    },

    saveQuestion: function () {
      this.questions.find(
        (obj) => obj.questionNumber == this.editingNumber
      ).type = this.type;
      this.questions.find(
        (obj) => obj.questionNumber == this.editingNumber
      ).pos = this.pos;
      this.questions.find(
        (obj) => obj.questionNumber == this.editingNumber
      ).info = this.info;
      this.questions.find((obj) => obj.questionNumber == this.editingNumber).q =
        this.questionText;
      this.questions.find((obj) => obj.questionNumber == this.editingNumber).a =
        this.answer;
      this.questions.find(
        (obj) => obj.questionNumber == this.editingNumber
      ).pic = this.pic;

      socket.emit("addQuestion", {
        gameId: this.gameId,
        type: this.type,
        pos: this.pos,
        info: this.info,
        q: this.questionText,
        a: this.answers,
        questionNumber: this.editingNumber,
        pic: this.pic,
      });
      console.log(this.questions);

      //var currentQuestion = this.questions.find(obj => obj.questionNumber == this.questionNumber);
      //console.log(currentQuestion);
    },

    /*   addQuestion: function() {
      //Ska inte skickas förrän alla frågor lagts till
      var newQuestion = this.questionText.trim();
      if (!newQuestion) {return;}
      socket.emit("addQuestion",
          {gameId: this.gameId,
            type: this.type,
            pos: this.pos,
            info: this.info,
            q: newQuestion,
            a: this.answers,
            questionNumber: this.questionNumber,
            pic: this.pic
          } )
      this.questions.push(
          {gameId: this.gameId,
            q: this.questions,
            a: this.answers,
            info: this.info,
            questionNumber: this.questionNumber}
      );
      this.question = '';
      this.answers = ["", ""];
      this.info = "";
    },*/

    currentData: function (questionNumber) {
      this.editingNumber = questionNumber;
      console.log(this.editingNumber);
      this.type = this.questions.find(
        (obj) => obj.questionNumber == questionNumber
      ).type;
      this.pos = this.questions.find(
        (obj) => obj.questionNumber == questionNumber
      ).pos;
      this.info = this.questions.find(
        (obj) => obj.questionNumber == questionNumber
      ).info;
      this.questionText = this.questions.find(
        (obj) => obj.questionNumber == questionNumber
      ).q;
      this.answer = this.questions.find(
        (obj) => obj.questionNumber == questionNumber
      ).a;
      this.pic = this.questions.find(
        (obj) => obj.questionNumber == questionNumber
      ).pic;
    },
    addAnswer: function () {
      this.answers.push("");
    },

    infoExpand: function () {
      this.infoBig = true;
      this.questionBig = false;
      this.mapBig = false;
      this.infoSmall = false;
      this.questionSmall = true;
      this.mapSmall = true;
      this.questionSmallCond = false;
    },
    questionExpand: function () {
      this.infoBig = false;
      this.questionBig = true;
      this.mapBig = false;
      this.infoSmall = true;
      this.questionSmall = false;
      this.mapSmall = true;
      this.questionSmallCond = false;
    },
    mapExpand: function () {
      this.infoBig = false;
      this.questionBig = false;
      this.mapBig = true;
      this.infoSmall = true;
      this.questionSmall = false;
      this.mapSmall = false;
      this.questionSmallCond = true;
    },
    closeExpand: function () {
      this.infoBig = false;
      this.questionBig = false;
      this.mapBig = false;
      this.infoSmall = false;
      this.questionSmall = false;
      this.mapSmall = false;
      this.questionSmallCond = false;
    },

    /*runQuestion: function () {
      socket.emit("runQuestion", {
        gameId: this.gameId,
        questionNumber: this.questionNumber,
      });
    },*/
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
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
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
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 25% 25% 25% 25%;
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
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
  overflow: scroll;
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
  grid-column: 3 / span 2;
  grid-row: 1 / span 2;
  overflow: scroll;
}
.questionBox h1 {
  font-size: 15px;
  grid-column: 2;
  grid-row: 1;
}
.map {
  grid-column: 1 / span 4;
  grid-row: 3 / span 2;
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
/* conditionl statments */
.infoBig {
  grid-column: 1 / span 4;
  grid-row: 1 / span 3;
  overflow: scroll;
}
.questionBig {
  grid-column: 1 / span 4;
  grid-row: 1 / span 3;
  overflow: scroll;
}
.mapBig {
  grid-column: 1 / span 4;
  grid-row: 1 / span 3;
  overflow: scroll;
}
.infoSmall {
  grid-column: 1 / span 2;
  grid-row: 4;
  overflow: scroll;
}
.questionSmall {
  grid-column: 1 / span 2;
  grid-row: 4;
  overflow: scroll;
}
.mapSmall {
  grid-column: 3 / span 2;
  grid-row: 4;
  overflow: scroll;
}
.questionSmallCond {
  grid-column: 3 / span 2;
  grid-row: 4;
  overflow: scroll;
}
::-webkit-scrollbar {
  width: 0;
}

.closeExpand {
  position: relative;
  right: 25vw;
  top: 1vh;
  width: 5vw;
  height: 5vh;
  opacity: 0.3;
}
.closeExpand:hover {
  opacity: 1;
}
</style>