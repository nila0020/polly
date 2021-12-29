<template>
  <section class="pagee">
    <section class="box titleBox">
      <!--Title box-->

      <!--      <h3>Game Title and GameID</h3>-->

      <!--      <div class="insertTitle">-->
      <div id="gameNameBox">
        <label for="gameName">{{ uiLabels.gameName }}: </label>
        <br />
        <input
          type="text"
          id="gameName"
          v-model="gameName"
          v-bind:placeholder="this.uiLabels.enterGameName"
        />
      </div>
      <div id="gameIDBox">
        <label for="gameID">{{ uiLabels.gameID }}: </label>
        <br />
        <input
          type="text"
          id="gameID"
          v-model="gameId"
          v-bind:placeholder="this.uiLabels.enterGameID"
        />
      </div>
      <div id="gameButtonBox">
        <button class="Button" v-on:click="createGame">
          {{ uiLabels.CreateGame }}
        </button>
        <br />
        <button class="Button" v-on:click="loadGame">Load Game</button>
      </div>
      <!--      </div>-->
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
              class="Button"
              id="overlook!Btn"
              v-on:click="[addNewQuestion(), closeExpand()]"
            >
              {{ uiLabels.Addquestion }}
            </button>
            <button class="Button" id="overlookBtn">
              {{ uiLabels.Deletequestion }}
            </button>
          </p>
        </div>
      </div>
      <!--Center box-->
      <div class="box centerBox">
        <!--Info box-->
        <div class="box info">
          <!--        v-on:click="infoExpand"
          v-bind:class="{ infoBig: infoBig, infoSmall: infoSmall }"-->

          <a
            v-if="{ infoBig: infoBig }"
            class="closeExpand"
            v-on:click="closeExpand"
            >X</a
          >
          <h1>Info</h1>
          <textarea
            class="infoArea"
            v-model="info"
            v-bind:placeholder="this.uiLabels.Questiondiscription"
          />
        </div>

        <!--Question box-->
        <div class="box questionBox">
          <!--         v-on:click="questionExpand"
          v-bind:class="{
            questionBig: questionBig,
            questionSmall: questionSmall,
            questionSmallCond: questionSmallCond,
          }"-->

          <h1>{{ this.uiLabels.createQuestion }}</h1>
          <div id="picBox">
            <img
              :src="pic"
              v-if="pic !== null"
              style="
                width: 90%;
                height: 75%;
                object-fit: cover;
                grid-row: 1;
                grid-column: 1 / span 2;
              "
              ref=""
            />
            <input
              type="file"
              @change="Preview_image"
              style="display: none"
              ref="fileInput"
            />
            <button
              v-on:click="$refs.fileInput.click()"
              style="grid-column: 1; grid-row: 2"
            >
              {{ this.uiLabels.chooseImage }}
            </button>
            <button
              v-on:click="removeImage"
              style="grid-column: 2; grid-row: 2"
            >
              {{ this.uiLabels.removeimage }}
            </button>
          </div>

          <div id="qBox">
            <textarea
              class="questionArea"
              v-model="questionText"
              v-bind:placeholder="this.uiLabels.questionInfo"
            />
          </div>

          <div id="aBox">
            <div v-if="checked === 'MCQ' || checked === null">
              <h1>Answers:</h1>
              <!--              <input
                v-for="(_, i) in answers"
                v-model="answers[i]"
                v-bind:key="'answer' + i"
                v-bind:placeholder="this.uiLabels.addanswer"
              />-->

              <h1>{{ this.uiLabels.chooseCorrect }}</h1>
              <ul id="example-1">
                <li v-for="(_, i) in answers" v-bind:key="'answer' + i">
                  <input
                    type="radio"
                    id="{{i}}"
                    v-model="correctAnswer"
                    v-bind:value="i"
                  />
                  <input
                    v-model="answers[i]"
                    v-bind:key="'answer' + i"
                    v-bind:placeholder="this.uiLabels.addanswer"
                  />
                  <label for="{{i}}"></label>
                </li>
              </ul>
              <button class="Button" v-on:click="addAnswer">
                {{ uiLabels.AddAnswerAlternative }}
              </button>
              <button class="Button" v-on:click="removeAnswer">
                {{ uiLabels.removeAnswerAlternative }}
              </button>
            </div>
            <div v-else-if="checked === 'slider'">
              <input type="number" v-model="sliderMinVal" />
              <input type="number" v-model="sliderMaxVal" />
              <input type="text" v-model="sliderUnit" placeholder="unit" />
              <Slider
                :poll="false"
                :min="sliderMinVal"
                :max="sliderMaxVal"
                :unit="sliderUnit"
                v-on:sliderValue="getSliderValue"
              />

              <div class="output">
                The lowest acceptable answer is: {{ this.sliderValue[0] }}
                {{ this.sliderUnit }}
              </div>
              <div class="output">
                The actual answer is: {{ this.sliderValue[1] }}
                {{ this.sliderUnit }}
              </div>
              <div class="output">
                The highest acceptable answer is: {{ this.sliderValue[2] }}
                {{ this.sliderUnit }}
              </div>
            </div>
          </div>
        </div>

        <!--Map box-->
        <div class="box map">
          <!--         v-on:click="mapExpand"
                  v-bind:class="{ mapBig: mapBig, mapSmall: mapSmall }"-->
          <div class="mapTitle">
            <h4>Choose a place on the map for your question to appear at</h4>
            <!-- Our map  -->
            <div id="myMap"></div>
          </div>
        </div>
      </div>

      <!--Tool box-->
      <div class="box toolBox" v-on:click="hideCenter = false">
        <h1>toolBox</h1>
        <div id="app">
          <input type="radio" id="MCQ" value="MCQ" v-model="checked" checked />
          <label for="MCQ">{{ uiLabels.MCQ }}</label>

          <br />

          <input type="radio" id="slider" value="slider" v-model="checked" />
          <label for="slider">{{ uiLabels.slider }}</label>
        </div>
        <br />
        <br />
        <br />
        <button class="Button" v-on:click="[saveQuestion()]">
          {{ uiLabels.Savequestion }}
        </button>
      </div>

      <div class="blocker3" v-if="hideCenter">
        <!-- blocks center-->
        <h1>Choose a type of question and you´re good to go</h1>
        <br />
        <h1>Don´t forget to save your question</h1>
      </div>
      <div class="blocker2" v-if="hideCenterAndTool">
        <!-- blocks center and tool-->
        <h1>Now add a question</h1>
      </div>
      <div class="blockerAll" v-if="hideAll">
        <!-- blocks overlook, center and tool-->
        <h1>Start by creating a Game</h1>
      </div>
    </section>
  </section>
</template>

<script>
import io from "socket.io-client";
import Slider from "@/components/Slider.vue";
import leaflet from "leaflet";
import { onMounted } from "vue";
const socket = io();
export default {
  components: {
    Slider,
  },
  setup() {
    //Load map

    let myMap;
    onMounted(() => {
      myMap = leaflet.map("myMap").setView([59.855727, 17.633445], 13);

      leaflet
        .tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGljdG9ydmlrdG9yIiwiYSI6ImNreGM4aW43ZjRkNzUydXFvYnB5eDZ3d3MifQ.gSVvXd28nfGeuWEnHdIEhQ",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1IjoicGljdG9ydmlrdG9yIiwiYSI6ImNreGM4aW43ZjRkNzUydXFvYnB5eDZ3d3MifQ.gSVvXd28nfGeuWEnHdIEhQ",
          }
        )
        .addTo(myMap);
      // Distance function
      function checkDistance(a, b) {
        if (myMap.distance(a, b) < 30) {
          alert("Within range");
        }
        console.log("avstånd i meter", myMap.distance(a, b));
      }

      // Find user location
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition);
      }, 5000);
      var lat, lng, marker, latLng;

      function getPosition(position) {
        if (marker) {
          myMap.removeLayer(marker);
        }

        lat = position.coords.latitude;
        lng = position.coords.longitude;
        latLng = [lat, lng];
        marker = leaflet.marker([lat, lng]).addTo(myMap);

        return latLng;
      }

      // Current distance from user location
      setTimeout(
        () => console.log(checkDistance(latLng, [59.855727, 17.633445])),
        6000
      );
      setTimeout(
        () => console.log("Marker din position utanför", latLng),
        6000
      );

      //Icon declaration
      var currentIcon = leaflet.icon({
        iconUrl: "img/redIcon.png",
        iconSize: [38, 95], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      });

      myMap.on("click", function (e) {
        var marker = new leaflet.marker([e.latlng.lat, e.latlng.lng], {
          currentIcon,
        }).addTo(myMap);
        var pos = [e.latlng.lat, e.latlng.lng];

        console.log("onClick marker", marker);
        console.log("Position", pos);
        if (!window.polly) {
          window.polly = {};
        }
        if (!window.polly.position) {
          window.polly.position = [];
        }
        window.polly.position = [...window.polly.position, pos];
        // window.polly.position = pos
      });
    });
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
      pos: [],
      correctAnswer: 0,
      answersAlt: [this.answers, this.correctAnswer],
      questionNumber: 0,
      editingNumber: 0,
      sliderMinVal: 10,
      sliderMaxVal: 20,
      sliderUnit: "",
      sliderValue: [],
      sliderAnswer: [
        this.sliderUnit,
        this.sliderMinVal,
        this.sliderMaxVal,
        this.sliderValue,
      ],
      pic: null,
      gameName: "",
      data: {},
      uiLabels: {},
      hideAll: true,
      hideCenterAndTool: true,
      hideCenter: true,
      checked: "MCQ",
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
    socket.on("gameLoaded", (data) => (this.questions = data));
  },
  methods: {
    getSliderValue(sliderValue) {
      this.sliderValue = sliderValue;
      this.sliderAnswer = [
        this.sliderUnit,
        this.sliderMinVal,
        this.sliderMaxVal,
        this.sliderValue,
      ];
    },
    Preview_image(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      //var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.pic = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function () {
      this.pic = null;
    },
    createGame: function () {
      this.hideAll = false;
      socket.emit("createGame", {
        gameId: this.gameId,
        lang: this.lang,
        gameName: this.gameName,
      });
    },
    loadGame: function () {
      this.hideAll = false;
      this.hideCenterAndTool = false;
      this.hideCenter = false;
      socket.emit("loadGame", {
        gameID: this.gameId,
      });
    },
    addNewQuestion: function () {
      this.pos = [];
      this.questionNumber++;
      this.questionText = "";
      this.answers = ["", ""];
      this.info = "";
      this.pic = null;
      this.editingNumber = this.questionNumber;
      this.hideCenterAndTool = false;
      this.correctAnswer = 0;
      this.answersAlt = [this.answers, this.correctAnswer];
      console.log(this.hideCenter);
      this.hideCond++;
      socket.emit("addQuestion", {
        gameId: this.gameId,
        type: this.checked,
        pos: this.pos, //window.polly.position || [],
        info: this.info,
        q: this.questionText,
        a: this.answersAlt,
        aS: this.sliderAnswer,
        questionNumber: this.questionNumber,
        pic: this.pic,
      });
      this.questions.push({
        gameId: this.gameId,
        type: this.checked,
        pos: this.pos, //window.polly.position || [],
        info: this.info,
        q: this.questionText,
        a: this.answersAlt,
        aS: this.sliderAnswer,
        questionNumber: this.questionNumber,
        pic: this.pic,
      });
      console.log(this.questions);
    },
    saveQuestion: function () {
      this.questions.find(
        (obj) => obj.questionNumber == this.editingNumber
      ).type = this.checked;
      this.questions.find(
        (obj) => obj.questionNumber == this.editingNumber
      ).pos = window.polly.position;
      this.questions.find(
        (obj) => obj.questionNumber == this.editingNumber
      ).info = this.info;
      this.questions.find((obj) => obj.questionNumber == this.editingNumber).q =
        this.questionText;
      this.questions.find(
        (obj) => obj.questionNumber == this.editingNumber
      ).a[0] = this.answers;
      this.questions.find(
        (obj) => obj.questionNumber == this.editingNumber
      ).a[1] = this.correctAnswer;
      this.questions.find(
        (obj) => obj.questionNumber == this.editingNumber
      ).aS = this.sliderAnswer;
      this.questions.find(
        (obj) => obj.questionNumber == this.editingNumber
      ).pic = this.pic;

      socket.emit("addQuestion", {
        gameId: this.gameId,
        type: this.checked,
        pos: this.pos,
        info: this.info,
        q: this.questionText,
        a: this.answersAlt,
        aS: this.sliderAnswer,
        questionNumber: this.editingNumber,
        pic: this.pic,
      });
      console.log(this.answers);
      //console.log(this.sliderAnswer);
      //$("#myElem").show().delay(5000).fadeOut();
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
      this.answersAlt = this.questions.find(
        (obj) => obj.questionNumber == questionNumber
      ).a;
      this.pic = this.questions.find(
        (obj) => obj.questionNumber == questionNumber
      ).pic;
    },
    addAnswer: function () {
      this.answers.push("");
    },
    removeAnswer: function () {
      this.answers.pop();
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
</script>

<style>
.pagee {
  background-color: black;
  text-align: center;
  font-size: 20pt;
  font-family: "Baloo Bhaijaan 2", cursive;
  color: black;
  padding-bottom: 50px;
}
#header h1 {
  font-family: "Times New Roman", Times, serif;
}
.container {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 50% 50%;
}
.blockerAll {
  color: white;
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  opacity: 95%;
}
.blocker2 {
  color: white;
  grid-column: 2 / span 2;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  opacity: 95%;
}
.blocker3 {
  color: white;
  grid-column: 2;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  opacity: 95%;
}

.box {
  color: #fff;
  border-radius: 5px;
  margin: 5px;
  padding: 20px;
  font-size: 100%;
}
.insertTitle {
  float: right;
}
.titleBox h3 {
  float: left;
}
.titleBox {
  display: grid;
  height: 15vh;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 100%;
  color: black;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("https://media.istockphoto.com/vectors/city-game-background-vector-id526716884?k=20&m=526716884&s=170667a&w=0&h=eSrH07Do4iPSAQ3i3iukNADDsfnNLoX1LnlUUuhlTO0=");
}

.Overlook {
  grid-column: 1;
  grid-row: 1 / span 2;
  border-style: dotted;
  background: linear-gradient(#4285f4ff, #1d7658, #1d7658);
  color: white;
}
.infoWindow {
  font: black;

  border-style: dotted;
}
.centerBox {
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
  grid-column: 2;
  grid-row: 1 / span 2;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 25% 25% 25% 25%;
  border-style: dotted;
  background: linear-gradient(#4285f4ff, #1d7658, #1d7658);
}
.toolBox {
  background: linear-gradient(#4285f4ff, #1d7658, #1d7658);

  grid-column: 3;
  grid-row: 1 / span 2;
  border-style: dotted;
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
  height: 20vh;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: black;
  resize: none;
  color: white;
}
.questionArea {
  width: 70%;
  height: 70%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: black;
  resize: none;
  color: white;
}
.questionBox {
  grid-column: 3 / span 2;
  grid-row: 1 / span 2;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 10% 45% 45%;
  overflow: scroll;
}
.questionBox h1 {
  font-size: 15px;
  grid-column: 1 / span 2;
  grid-row: 1;
}
#picBox {
  display: grid;
  grid-template-rows: 80% 20%;
  grid-template-columns: 50% 50%;
  height: 100%;
  grid-column: 1;
  grid-row: 2;
  margin-right: 1vw;
}
#qBox {
  height: 100%;
  padding-top: 2vh;
  grid-column: 2;
  grid-row: 2;
}
#aBox {
  grid-column: 1 / span 2;
  grid-row: 3;
}
.map {
  grid-column: 1 / span 4;
  grid-row: 3 / span 2;
}
.Button {
  float: right;
  align-items: center;
  background-image: linear-gradient(144deg, #c4bdbd, #000000 50%, #9a9797);

  border-color: white;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: "Baloo Bhaijaan 2", cursive;
  font-size: 3vh;
  justify-content: center;
  line-height: 2em;
  max-width: 100%;
  min-width: 160px;
  padding: 3px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}
.Button:active,
.Button:hover {
  outline: 0;
}
.Button span {
  background-color: #000000;
  padding: 16px 24px;
  border-radius: 6px;
  width: 100%;
  height: 45%;
  transition: 300ms;
}
.Button:hover span {
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
  height: 320px;
}

#gameNameBox {
  grid-column: 1;
}
#gameIDBox {
  grid-column: 2;
}
#gameButtonBox {
  grid-column: 3;
}
</style>