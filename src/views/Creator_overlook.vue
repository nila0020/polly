<template>
  <section class="pagee">
    <section class="titleBox">
      <div class="column">
        <label for="gameName">{{ uiLabels.gameName }}: </label>
        <span class="break"><br /></span>
        <input
          type="text"
          id="gameName"
          v-model="gameName"
          v-bind:placeholder="this.uiLabels.enterGameName"
        />
      </div>
      <div class="column">
        <label for="gameID">{{ uiLabels.gameID }}: </label>
        <span class="break"><br /></span>
        <input
          type="text"
          id="gameID"
          v-model="gameId"
          v-bind:placeholder="this.uiLabels.enterGameID"
        />
      </div>
      <div class="column buttonBox">
        <v-btn class="Button createButton greenButton" v-on:click="createGame">
          <span>{{ uiLabels.CreateGame }}</span>
        </v-btn>

        <v-btn class="Button loadButton redButton" v-on:click="loadGame">
          <span>{{ this.uiLabels.loadGame }}</span>
        </v-btn>
      </div>
    </section>

    <section class="container">
      <!--Overlook box-->
      <div class="box Overlook">
        <!--Add new questions and list them-->
        <div id="overlookList">
          <ul>
            <li v-bind:key="question" v-for="question in questions">
              <label>
                <v-btn
                  class="Button questionButton"
                  v-on:click="[currentData(question.qId), closeExpand()]"
                  key=""
                >
                  <span>{{ question.qId }}.{{ question.q }}</span>
                </v-btn>
              </label>
            </li>
          </ul>
          <p>
            <v-btn
              class="Button addQuestion greenButton"
              id="overlook!Btn"
              v-on:click="[saveQuestion(), addNewQuestion(), closeExpand()]"
            >
              <span>{{ uiLabels.Addquestion }}</span>
            </v-btn>

            <v-btn
              class="Button removeQuestion redButton"
              v-on:click="removeQuestion"
            >
              <span>{{ uiLabels.Deletequestion }}</span>
            </v-btn>
          </p>
        </div>
      </div>
      <div
        v-if="this.activeQuestion"
        v-show="this.activeQuestion"
        class="questionDisplayed"
      >
        <Question v-bind:question="questions[i]" v-on:answer="nextQuestion" />
      </div>
      <!--Center box-->
      <div v-show="!this.activeQuestion" class="box centerBox">
        <div id="picBox">
          <p style="grid-column: 1 / span2; grid-row: 1">
            {{ this.uiLabels.addImage }}
          </p>
          <img
            :src="pic"
            v-if="pic !== null"
            style="
              padding: 12px 20px;
              width: 90%;
              height: 75%;
              object-fit: cover;
              grid-row: 2;
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
          <v-btn
            class="Button chooseImage greenButton"
            v-on:click="$refs.fileInput.click()"
            style="grid-column: 1; grid-row: 3"
          >
            <span>{{ this.uiLabels.chooseImage }}</span>
          </v-btn>
          <v-btn
            class="Button removeImage redButton"
            v-on:click="removeImage"
            style="grid-column: 2; grid-row: 3"
          >
            <span>{{ this.uiLabels.removeimage }}</span>
          </v-btn>
        </div>

        <div id="qBox">
          {{ this.uiLabels.question }} <br />
          {{ this.uiLabels.writeQuestion }}
          <div class="questionTextAreablock">
            <textarea
              class="questionArea"
              v-model="questionText"
              v-bind:placeholder="this.uiLabels.questionInfo"
            />
          </div>
        </div>

        <div id="aBox">
          {{ this.uiLabels.answer }} <br />
          <div v-if="checked === 'MCQ' || checked === null">
            {{ this.uiLabels.chooseCorrect }}
            <ul id="answerList">
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
                <label for="{{i}}" v-if="i === correctAnswer">✓</label>
              </li>
            </ul>
            <v-btn class="Button addButton greenButton" v-on:click="addAnswer">
              <span>
                {{ uiLabels.AddAnswerAlternative }}
              </span>
            </v-btn>
            <v-btn
              class="Button removeButton redButton"
              v-on:click="removeAnswer"
            >
              <span>
                {{ uiLabels.removeAnswerAlternative }}
              </span>
            </v-btn>
          </div>
          <div v-else-if="checked === 'slider'">
            <label for="minVal"
              ><span style="font-size: 2.2vh">{{ uiLabels.minVal }}</span>
            </label>
            <input id="minVal" type="number" v-model="sliderMinVal" />
            <br />
            <label for="maxVal"
              ><span style="font-size: 2.2vh">{{ uiLabels.maxVal }}</span>
            </label>
            <input id="maxVal" type="number" v-model="sliderMaxVal" />
            <br />
            <label for="unit"
              ><span style="font-size: 2.2vh">{{ uiLabels.unit }}</span>
            </label>
            <br />
            <input
              id="unit"
              type="text"
              v-model="sliderUnit"
              placeholder="unit"
            />
            <Slider
              :poll="false"
              :min="sliderMinVal"
              :max="sliderMaxVal"
              :unit="sliderUnit"
              v-on:sliderValue="getSliderValue"
            />

            <div class="output">
              <span style="font-size: 2vh"
                >Lowest correct answer: {{ this.sliderValue[0] }}
                {{ this.sliderUnit }}</span
              >
            </div>
            <div class="output">
              <span style="font-size: 2vh"
                >The actual answer: {{ this.sliderValue[1] }}
                {{ this.sliderUnit }}</span
              >
            </div>
            <div class="output">
              <span style="font-size: 2vh"
                >Highest correct answer: {{ this.sliderValue[2] }}
                {{ this.sliderUnit }}</span
              >
            </div>
          </div>
        </div>

        <!--Map box-->
        <div class="box map">
          <div class="mapTitle" v-show="!hideCenter && !saveVisible">
            <h4>
              {{ this.uiLabels.mapPosition }}
            </h4>
            <!-- Our map  -->
            <div id="myMap"></div>
          </div>
        </div>
      </div>

      <!--Tool box-->
      <div class="box toolBox" v-on:click="hideCenter = false">
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
        <div class="toolBoxButtons">
          <router-link v-bind:to="'/poll/' + lang"
            ><v-btn
              outline
              block
              class="Button goToGame redButton"
              v-on:click="sendGameId"
            >
              <span>{{ uiLabels.goToGame }}</span>
            </v-btn>
          </router-link>
          <v-btn
            class="Button redButton viewQuestion"
            v-on:click="viewQuestions"
          >
            <span>{{ this.uiLabels.viewQuiz }}</span>
          </v-btn>
          <v-btn
            class="Button greenButton saveQuestion"
            v-on:click="
              [saveQuestion(), (setVisible = true), showSaveBlocker()]
            "
          >
            <span
              style="
                display: flex;
                flex-direction: column;

                justify-content: center;
              "
            >
              <div>{{ uiLabels.Savequestion }}</div></span
            >
          </v-btn>
        </div>
      </div>

      <div class="blocker3" v-if="hideCenter">
        <!-- blocks center-->
        <h1>{{ uiLabels.blocker3Part1 }}</h1>
        <br />
        <h1>{{ uiLabels.blocker3Part2 }}</h1>
      </div>
      <div class="blocker2" v-if="hideCenterAndTool">
        <!-- blocks center and tool-->
        <h1>{{ uiLabels.blocker2 }}</h1>
      </div>
      <div class="blockerAll" v-if="hideAll">
        <!-- blocks overlook, center and tool-->
        <h1>{{ uiLabels.blocker1Part1 }}</h1>
        <br />
        <h1>{{ uiLabels.blocker1Part2 }}</h1>
        <br />
        <h1>{{ uiLabels.blocker1Part3 }}</h1>
      </div>
      <div v-show="saveVisible" class="saveBlocker">
        <h1>question saved</h1>
      </div>
    </section>
  </section>
</template>

<script>
import Question from "@/components/Question.vue";
import io from "socket.io-client";
import Slider from "@/components/Slider.vue";
import leaflet from "leaflet";
import { onMounted, reactive } from "vue";
const socket = io();
export default {
  components: {
    Slider,
    Question,
  },
  setup() {
    //Load map

    let myMap;
    const reactiveProperties = reactive({ pos: null, clearMap: null });
    onMounted(() => {
      myMap = leaflet.map("myMap").setView([59.855727, 17.633445], 13);

      leaflet
        .tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGljdG9ydmlrdG9yIiwiYSI6ImNreGM4aW43ZjRkNzUydXFvYnB5eDZ3d3MifQ.gSVvXd28nfGeuWEnHdIEhQ",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            minZoom: 1,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1IjoicGljdG9ydmlrdG9yIiwiYSI6ImNreGM4aW43ZjRkNzUydXFvYnB5eDZ3d3MifQ.gSVvXd28nfGeuWEnHdIEhQ",
          }
        )
        .addTo(myMap);
      // Distance function
      /*    function checkDistance(a, b) {
        if (myMap.distance(a, b) < 30) {
          alert("Within range");
        }
        console.log("avstånd i meter", myMap.distance(a, b));
      } */

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
        var meIcon = leaflet.icon({
          iconUrl: "img/meIcon.png",
          iconSize: [24, 24], // size of the icon
          iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        });
        marker = leaflet.marker([lat, lng], { icon: meIcon }).addTo(myMap);

        return latLng;
      }

      //Icon declaration
      var currentIcon = leaflet.icon({
        iconUrl: "img/redIcon.png",
        iconSize: [26, 26], // size of the icon
        iconAnchor: [13, 26], // point of the icon which will correspond to marker's location
        className: "markering",
      });

      //LayerGroup
      var markerGroup = leaflet.layerGroup();
      myMap.addLayer(markerGroup);
      markerGroup.addTo(myMap);

      myMap.on("dblclick", function (e) {
        var marker2 = new leaflet.marker([e.latlng.lat, e.latlng.lng], {
          icon: currentIcon,
        });

        marker2.on("click", function (e) {
          console.log(e);
          markerGroup.removeLayer(marker2);
        });

        var pos = [e.latlng.lat, e.latlng.lng];
        reactiveProperties.pos = pos;
        console.log("onClick marker", marker);
        console.log("innan socketemit i myMap.onclick :Position", pos);
        socket.emit("reactivePosition", reactiveProperties.pos);
        markerGroup.addLayer(marker2);
      });

      reactiveProperties.clearMap = function () {
        markerGroup.clearLayers();
      };
    });

    return { reactiveProperties };
  },

  data: function () {
    return {
      questionText: "",
      questions: [],
      lang: "",
      gameId: "",
      question: "",
      type: this.checked,
      answers: ["", ""],
      pos: [],
      clearMap: null,
      correctAnswer: 0,
      answersAlt: [this.answers, this.correctAnswer],
      qId: 0,
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
      hideCenter: false,
      checked: "MCQ",
      infoBig: false,
      questionBig: false,
      mapBig: false,
      infoSmall: false,
      questionSmall: false,
      mapSmall: false,
      questionSmallCond: false,
      activeQuestion: false,
      i: 0,
      styleObject: {
        color: "red",
        fontSize: "13px",
        height: "1px",
      },
      saveVisible: false,
    };
  },
  computed: {
    v: function () {
      return this.questions.length + 1;
    },
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("dataUpdate", (data) => (this.data = data));
    socket.on("gameCreated", (data) => (this.data = data));
    socket.on("gameLoaded", (data) => (this.questions = data[0]));
    socket.on("questionPosition", (data) => (this.pos = data));
  },
  methods: {
    showSaveBlocker: function () {
      this.saveVisible = true;
      console.log(this.saveVisible);
      setTimeout(() => (this.saveVisible = false), 1000);
    },
    sendGameId: function () {
      socket.emit("sendGameId", {
        gameID: this.gameId,
      });
    },
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
      this.hideCenter = true;
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
      this.qId = this.questions.length + 1;
      this.questionText = "";
      this.answers = ["", ""];
      this.info = "";
      this.pic = null;
      this.editingNumber = this.qId;
      this.hideCenterAndTool = false;
      this.correctAnswer = 0;
      this.answersAlt = [this.answers, this.correctAnswer];
      console.log(this.hideCenter);
      this.hideCond++;
      socket.emit("addQuestion", {
        gameId: this.gameId,
        type: this.checked,
        pos: this.pos,
        info: this.info,
        q: this.questionText,
        a: this.answersAlt,
        aS: this.sliderAnswer,
        qId: this.qId,
        pic: this.pic,
      });
      this.questions.push({
        gameId: this.gameId,
        type: this.checked,
        pos: this.pos,
        info: this.info,
        q: this.questionText,
        a: this.answersAlt,
        aS: this.sliderAnswer,
        qId: this.qId,
        pic: this.pic,
      });
    },
    saveQuestion: function () {
      if (!this.hideCenterAndTool) {
        this.questions.find((obj) => obj.qId == this.editingNumber).type =
          this.checked;
        this.questions.find((obj) => obj.qId == this.editingNumber).pos =
          this.question.pos;
        this.questions.find((obj) => obj.qId == this.editingNumber).info =
          this.info;
        this.questions.find((obj) => obj.qId == this.editingNumber).q =
          this.questionText;
        this.questions.find((obj) => obj.qId == this.editingNumber).a[0] =
          this.answers;
        this.questions.find((obj) => obj.qId == this.editingNumber).a[1] =
          this.correctAnswer;
        this.questions.find((obj) => obj.qId == this.editingNumber).aS =
          this.sliderAnswer;
        this.questions.find((obj) => obj.qId == this.editingNumber).pic =
          this.pic;

        socket.emit("addQuestion", {
          gameId: this.gameId,
          type: this.checked,
          pos: this.pos,
          info: this.info,
          q: this.questionText,
          a: this.answersAlt,
          aS: this.sliderAnswer,
          qId: this.editingNumber,
          pic: this.pic,
        });
      }
    },

    removeQuestion: function () {
      this.questions.pop();
      socket.emit("removeQuestion", { gameId: this.gameId });
      console.log(this.questions);
    },
    viewQuestions: function () {
      console.log(this.questions.length);
      this.activeQuestion = true;
      console.log(this.activeQuestion);
      console.log(this.questions[this.i]["a"]);
    },

    nextQuestion: function () {
      if (this.i + 1 < this.questions.length) {
        this.i++;
      } else {
        this.i = 0;
        this.activeQuestion = false;
      }
    },

    currentData: function (qId) {
      this.editingNumber = qId;
      console.log(this.editingNumber);
      this.checked = this.questions.find((obj) => obj.qId == qId).type;
      this.pos = this.questions.find((obj) => obj.qId == qId).pos;
      this.info = this.questions.find((obj) => obj.qId == qId).info;
      this.questionText = this.questions.find((obj) => obj.qId == qId).q;
      this.answersAlt = this.questions.find((obj) => obj.qId == qId).a;
      this.answers = this.answersAlt[0];
      this.sliderAnswer = this.answersAlt[1];
      this.pic = this.questions.find((obj) => obj.qId == qId).pic;
    },
    addAnswer: function () {
      if (this.answers.length < 4) {
        this.answers.push("");
      }
    },
    removeAnswer: function () {
      this.answers.pop();
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
  },
};
</script>

<style>
.pagee {
  background: #2674b0;
  text-align: center;
  font-size: 20pt;
  font-family: "Baloo Bhaijaan 2", cursive;
  color: black;
}
#header h1 {
  font-family: "Times New Roman", Times, serif;
}
.titleBox h3 {
  float: left;
}
.titleBox {
  width: 100%;
  height: 13vh;
  display: table;
  clear: both;
  color: black;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url(../../public/img/Backgraound-creat.jpg);
}
.column {
  float: left;
  width: 30%;
}
.buttonBox {
  float: right;
}
.container {
  display: grid;
  width: 100%;
  min-height: 800px;
  grid-template-columns: 15% 70% 15%;
  grid-template-rows: 50% 50%;
}

.box {
  color: #fff;
  border-radius: 5px;
  margin: 5px;
  padding: 0;
  font-size: 100%;
}
.insertTitle {
  float: right;
}

.Overlook {
  padding-top: 5vh;
  grid-column: 1;
  grid-row: 1 / span 2;
  border-style: dotted;
  background: linear-gradient(#3bc1d9, #2674b0, #27a27a);
  color: white;
}
.infoWindow {
  font: black;

  border-style: dotted;
}
.centerBox {
  position: relative;
  padding: 0;
  margin-top: 5px;
  margin-bottom: 0;
  grid-column: 2;
  grid-row: 1 / span 2;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 15% 15% 7% 63%;
  border-style: dotted;
  background: linear-gradient(#3bc1d9, #2674b0, #27a27a);
}
.toolBox {
  display: grid;
  grid-template-rows: 10% 25% 30% 25%;
  background: linear-gradient(#3bc1d9, #2674b0, #27a27a);
  grid-column: 3;
  grid-row: 1 / span 2;
  border-style: dotted;
}
#app {
  grid-row: 2;
}
.toolBoxButtons {
  grid-row: 4;
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
.questionTextAreablock {
  width: 100%;
  height: 100%;
}
.questionArea {
  width: 70%;
  height: 40%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 4px;
  background-color: white;
  resize: none;
  color: black;
}
.questionBox {
  grid-column: 1 / span 2;
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
  margin-top: 8%;
  text-align: center;
  display: grid;
  grid-template-rows: 10% 70% 20%;
  grid-template-columns: 50% 50%;
  height: 100%;
  grid-column: 1;
  grid-row: 1 / span 2;
  margin-right: 1vw;
  align-items: center;
}
#qBox {
  height: 80%;
  padding-top: 2vh;
  grid-column: 2;
  grid-row: 1 / span 2;
}
#aBox {
  z-index: 1;
  padding-top: 2vh;
  grid-column: 3;
  grid-row: 1 / span 2;
}
#aBox input {
  border: solid black 2px;
  border-radius: 4px;
}

#answerList {
  list-style-type: none;
}
#overlookList {
  list-style-type: none;
}
.map {
  margin-top: 5vh;
  grid-column: 1 / span 3;
  grid-row: 4;
}

#myMap {
  height: 400px;
}
.blockerAll {
  z-index: 4;
  color: white;
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  transition: 300ms;
}
.blocker2 {
  z-index: 3;
  color: white;
  height: 100%;
  grid-column: 2 / span 2;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  transition: 300ms;
}
.blocker3 {
  z-index: 2;
  color: white;
  height: 100%;
  grid-column: 2;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  transition: 300ms;
}
.saveBlocker {
  align-content: center;
  z-index: 2;
  height: 100%;
  color: #126514;
  grid-column: 2;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  transition: 300ms;
}
.questionDisplayed {
  width: 100%;
  height: 100%;
  grid-column: 2;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
}
.Button {
  margin-bottom: 3px;
  justify-content: center;
  border-color: white;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: "Baloo Bhaijaan 2", cursive;
  font-size: 2vh;
  justify-content: center;
  line-height: 2em;
  width: 150px;
  height: 4.5vh;
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
  border-radius: 6px;
  width: 100%;
  height: 30%;
  transition: 300ms;
}
.Button:hover span {
  background: none;
}
.greenButton {
  background-image: linear-gradient(144deg, #65be51, #126514 50%, #65be51);
}
.redButton {
  background-image: linear-gradient(144deg, #fa628d, #881d33 50%, #fa628d);
}
.createButton {
  display: grid;
  width: 60%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}

.loadButton {
  display: grid;
  width: 60%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}

.addButton {
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}

.removeButton {
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}

.addQuestion {
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}

.removeQuestion {
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}
.saveQuestion {
  display: grid;
  align-content: center;
  width: 100%;
  height: 30%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}

.viewQuestion {
  margin-bottom: 20px;
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}
.goToGame {
  justify-self: end;
  margin-top: 40%;
  margin-bottom: 20px;
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}
.removeImage {
  justify-self: center;
  align-self: center;
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}
.chooseImage {
  justify-self: center;
  align-self: center;
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}
.questionButton {
  display: grid;
  margin-bottom: 4px;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  background-image: linear-gradient(144deg, #105646, #b6d7a8ff 50%, #105646);
}
.questionButton span {
  background-image: linear-gradient(144deg, #b6d7a8ff, #105646 50%, #b6d7a8ff);
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}

.redButton span {
  background-image: linear-gradient(144deg, #881d33, #fa628d 50%, #881d33);
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}
.greenButton span {
  background-image: linear-gradient(144deg, #126514, #65be51 50%, #126514);
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}

::-webkit-scrollbar {
  width: 0;
}

.mapTitle {
  font-size: 20px;
}
ul {
  list-style-type: none;
  padding: 0px;
}
.break {
  display: inline;
}

@media screen and (max-width: 1400px) {
  .pagee {
    font-size: 15pt;
  }
  #myMap {
    height: 300px;
  }
}
@media screen and (max-width: 1100px) {
  .pagee {
    font-size: 12pt;
  }
  #myMap {
    height: 250px;
  }
}
</style>