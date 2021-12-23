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
          v-bind:placeholder="this.uiLabels.enterGameName"
        /><br />
        <label for="gameID">{{ uiLabels.gameID }}: </label>
        <input
          type="text"
          id="gameID"
          v-model="gameId"
          v-bind:placeholder="this.uiLabels.enterGameID"
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
          v-bind:class="{ infoBig: infoBig,
                          infoSmall: infoSmall }"
        >
          <a v-if="{ infoBig: infoBig}" class="closeExpand" v-on:click="closeExpand" >X</a>
          <h1>Info</h1>
          <textarea
            class="infoArea"
            v-model="info"
            v-bind:placeholder="this.uiLabels.Questiondiscription"
          />
        </div>

        <!--Question box-->
        <div
          class="box questionBox"
          v-on:click="questionExpand"
          v-bind:class="{ questionBig: questionBig,
                          questionSmall: questionSmall,
                          questionSmallCond: questionSmallCond,
          }"
        >
          <h1>{{ this.uiLabels.createQuestion }}</h1>
          <div id="picBox" >
            <img :src="pic"
                v-if="pic !== null"
                style="width: 90%; height: 75%; object-fit: cover" ref=""
            />
            <br>
            <input type="file"
                   @change="Preview_image"
                   style="display: none"
                   ref="fileInput"
            />
            <button v-on:click="$refs.fileInput.click()">{{ this.uiLabels.chooseImage }}</button>
            <button v-on:click="removeImage" >{{ this.uiLabels.removeimage }}</button>
          </div>

          <div id="qBox">
            <textarea
                class="questionArea"
                v-model="questionText"
                v-bind:placeholder= "this.uiLabels.questionInfo"
            />
          </div>

          <div id="aBox">
            <div v-if="checked === 'MCQ' || checked === null">
              <h1>Answers:</h1>
              <input
                v-for="(_, i) in answers"
                v-model="answers[i]"
                v-bind:key="'answer' + i"
                v-bind:placeholder=this.uiLabels.addanswer
              />
              <button v-on:click="addAnswer">
                {{ uiLabels.AddAnswerAlternative }}
              </button>
              <br />
            </div>
            <div v-else-if="checked === 'slider'">
              <input type="number" v-model="sliderMinVal">
              <input type="number" v-model="sliderMaxVal">
              <input type="text" v-model="sliderUnit" placeholder="unit">
              <Slider :min="sliderMinVal" :max="sliderMaxVal" :unit="sliderUnit" v-on:sliderValue="getSliderValue"/>

              <div class="output">The lowest acceptable answer is: {{ this.sliderValue[0] }} {{ this.sliderUnit }}</div>
              <div class="output">The actual answer is: {{ this.sliderValue[1] }} {{ this.sliderUnit }}</div>
              <div class="output">The highest acceptable answer is: {{ this.sliderValue[2] }} {{ this.sliderUnit }}</div>
            </div>


            <!--            <input type="number" v-model.number = "questionNumber" placeholder="Choose a question nr">-->
                      <!-- <input type="number" v-model="questionNumber"> // Denna funktionalitet ska in i en Start Game-knapp då det skickar frågan till Poll
                      <button v-on:click="runQuestion">
                        Run question
                      </button> -->
          </div>
        </div>

        <!--Map box-->
        <div
          class="box map"
          v-on:click="mapExpand"
          v-bind:class="{ mapBig: mapBig, mapSmall: mapSmall }"
          >
          <div class = 'mapTitle'>
          <h4>Choose a place on the map for your question to appear at</h4>
          <!-- Our map  -->
             <div id="myMap"></div>
           
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
        <br>
        <br>
        <br>
        <button v-on:click="[saveQuestion()]">
          {{ uiLabels.Savequestion }}
        </button>
      </div>

      <div class="blockerAll" v-if="hideAll">
        <!-- blocks overlook, center and tool-->
      </div>
      <div class="blocker2" v-if="hideCenterandTool">
        <!-- blocks center and tool-->
      </div>
    </section>
  </section>
</template>

<script>

import io from "socket.io-client";
import Slider from "@/components/Slider.vue";
import leaflet from 'leaflet';
import { onMounted} from 'vue';
// import { useGeolocation } from '@/components/useGeolocation.js'

const socket = io();
export default {
  components: {
    Slider
    
  },
 
    setup() {
     
    //   const {coords} = useGeolocation()
    // const currPos = computed(() => ({
    //   lat: coords.value.latitude,
    //   lng: coords.value.longitude
    // }))
    
      let myMap;
      onMounted(()=>{
        myMap = leaflet.map('myMap').setView([59.855727, 17.633445], 13);
       
        leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGljdG9ydmlrdG9yIiwiYSI6ImNreGM4aW43ZjRkNzUydXFvYnB5eDZ3d3MifQ.gSVvXd28nfGeuWEnHdIEhQ', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicGljdG9ydmlrdG9yIiwiYSI6ImNreGM4aW43ZjRkNzUydXFvYnB5eDZ3d3MifQ.gSVvXd28nfGeuWEnHdIEhQ',
        
}).addTo(myMap);

function checkDistance(a,b) {
          if ( myMap.distance(a,b) < 30) {
            alert('Within range')}
            console.log('avstånd i meter',myMap.distance(a,b))
    
}


setInterval(() => {
  
  navigator.geolocation.getCurrentPosition(getPosition)
  
},5000
); 

var lat,lng, marker, latLng
function getPosition(position) {
   
  if (marker) {
    myMap.removeLayer(marker)
  }
  // if (circle) {
  //   myMap.removeLayer(circle)
  //   }
  
   
  lat = position.coords.latitude
  lng = position.coords.longitude
  latLng = [lat, lng]
marker = leaflet.marker([lat, lng]).addTo(myMap)
// circle = leaflet.circle([lat, lng], {radius: accuracy}).addTo(myMap)
return latLng;
}

setTimeout(() => console.log(checkDistance(latLng,[59.855727, 17.633445])), 6000);


setTimeout(() => console.log('Marker din position utanför',latLng), 6000);
// console.log('Marker din position utanför',lat, lng)





//Att göra - Om myPos är inom 20m från aktuell pin => Generera fråga


myMap.on("click", function(e){
      var marker = new leaflet.marker([e.latlng.lat, e.latlng.lng]).addTo(myMap);  
 console.log('onClick marker',marker)
          
    
    }
    );
//  if ( myMap.distance([getPosition.myLat, getPosition.myLng],[e.latlng.lat, e.latlng.lng] )) {}
     }) 
},
    data: function () {
      return {
        
        questionText: "", // detta är textrutan i overlook - Den funktionen ska vara i questionbox
        questions: [],
        info: "",
        lang: "",
        gameId: "",
        question: "",
        answers: ["", ""],
        questionNumber: 0,
        editingNumber: 0,
        sliderMinVal: 10,
        sliderMaxVal: 20,
        sliderUnit: "",
        sliderValue: [],
        sliderAnswer: [this.sliderUnit,
          this.sliderMinVal,
          this.sliderMaxVal,
          this.sliderValue],
        pic: null,
        gameName: "",
        data: {},
        uiLabels: {},
        hideAll: true,
        hideCenterAndTool: false,
        checked: "MCQ",
        infoBig: false,
        questionBig: false,
        mapBig: false,
        infoSmall: false,
        questionSmall: false,
        mapSmall: false,
        questionSmallCond: false,
        // lat: Number,
        // lng: Number
      };
    }
  ,


    created: function () {
      this.lang = this.$route.params.lang;
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        this.uiLabels = labels;
      });
      socket.on("dataUpdate", (data) => (this.data = data));
      socket.on("gameCreated", (data) => (this.data = data));
    }
  ,

    methods: {


      
      getSliderValue(sliderValue)
      {
        this.sliderValue = sliderValue;
        this.sliderAnswer = [this.sliderUnit,
          this.sliderMinVal,
          this.sliderMaxVal,
          this.sliderValue];
        console.log(this.sliderValue)
      }
    ,

      Preview_image(e)
      {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
        //console.log(e.target.files[0]);
      }
    ,
      createImage(file)
      {
        //var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.pic = e.target.result;
        };
        reader.readAsDataURL(file);

      }
    ,
      removeImage: function () {
        this.pic = null;

      }
    ,

      createGame: function () {
        this.hideAll = false;
        socket.emit("createGame", {
          gameId: this.gameId,
          lang: this.lang,
          gameName: this.gameName,
        });
      }
    ,

      addNewQuestion: function () {
        this.questionNumber++;
        this.questionText = "";
        this.answers = ["", ""];
        this.info = "";
        this.pic = null;
        this.editingNumber = this.questionNumber;
        socket.emit("addQuestion", {
          gameId: this.gameId,
          type: this.checked,
          pos: this.pos,
          info: this.info,
          q: this.questionText,
          a: this.answers,
          aS: this.sliderAnswer,
          questionNumber: this.questionNumber,
          pic: this.pic,
        });
        this.questions.push({
          gameId: this.gameId,
          type: this.checked,
          pos: this.pos,
          info: this.info,
          q: this.questionText,
          a: this.answers,
          aS: this.sliderAnswer,
          questionNumber: this.questionNumber,
          pic: this.pic,
        });
        console.log(this.questions);
      }
    ,

      saveQuestion: function () {
        this.questions.find(
            (obj) => obj.questionNumber == this.editingNumber
        ).type = this.checked;
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
        this.questions.find((obj) => obj.questionNumber == this.editingNumber).aS =
            this.sliderAnswer;
        this.questions.find(
            (obj) => obj.questionNumber == this.editingNumber
        ).pic = this.pic;

        socket.emit("addQuestion", {
          gameId: this.gameId,
          type: this.checked,
          pos: this.pos,
          info: this.info,
          q: this.questionText,
          a: this.answers,
          aS: this.sliderAnswer,
          questionNumber: this.editingNumber,
          pic: this.pic,
        });
        console.log(this.questions);
        console.log(this.sliderAnswer)
        //$("#myElem").show().delay(5000).fadeOut();
      }
    ,


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
        this.checked = this.questions.find(
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
      }
    ,
      addAnswer: function () {
        this.answers.push("");
      }
    ,

      infoExpand: function () {
        this.infoBig = true;
        this.questionBig = false;
        this.mapBig = false;
        this.infoSmall = false;
        this.questionSmall = true;
        this.mapSmall = true;
        this.questionSmallCond = false;
      }
    ,
      questionExpand: function () {
        this.infoBig = false;
        this.questionBig = true;
        this.mapBig = false;
        this.infoSmall = true;
        this.questionSmall = false;
        this.mapSmall = true;
        this.questionSmallCond = false;
      }
    ,
      mapExpand: function () {
        this.infoBig = false;
        this.questionBig = false;
        this.mapBig = true;
        this.infoSmall = true;
        this.questionSmall = false;
        this.mapSmall = false;
        this.questionSmallCond = true;
      }
    ,
      closeExpand: function () {
        this.infoBig = false;
        this.questionBig = false;
        this.mapBig = false;
        this.infoSmall = false;
        this.questionSmall = false;
        this.mapSmall = false;
        this.questionSmallCond = false;
      }
    ,

      /*runQuestion: function () {
      socket.emit("runQuestion", {
        gameId: this.gameId,
        questionNumber: this.questionNumber,
      });
    },*/
    }
  ,
  };

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
.blockerAll {
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  opacity: 80%;
}
.blocker2 {
  grid-column: 2 / span 2;
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
.infoWindow {
  font: black;
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
  margin-top: 0;
  font-size: 25px;
}
.info {
  padding-top: 0;
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
.questionArea{
  width: 100%;
  height: 70%;
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
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 5vh 20vh 20vh;
  overflow: scroll;
}
.questionBox h1 {
  font-size: 15px;
  grid-column: 1/span 2;
  grid-row: 1;
}
#picBox {
  grid-column: 1;
  grid-row: 2;
  padding-top: 8vh;
  margin-right: 1vw;
}
#qBox {
  padding-top: 2vh;
  grid-column: 2;
  grid-row: 2;
}
#aBox {
   grid-column: 1/span 2;
   grid-row: 3;
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
  grid-template-columns: 50% 50%;
  grid-template-rows: 10% 45% 45%;
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
.mapTitle {
  font-size: 20px;
}
#myMap { 
  height: 500px; }
</style>