<template>
  <section class="pagee">
    <section class="titleBox">
      <!--Title box-->

      <!--      <h3>Game Title and GameID</h3>-->

      <!--      <div class="insertTitle">-->
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
        <!--        <span class="break"><br /></span>-->

        <v-btn class="Button loadButton redButton" v-on:click="loadGame">
          <span>{{ this.uiLabels.loadGame }}</span>
        </v-btn>
      </div>
      <!--      </div>-->
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
            <!--            <input type="text" v-model="questionText" placeholder="add new question here" /> Detta är inputrutan i overlook -->
            <v-btn
              class="Button addQuestion greenButton"
              id="overlook!Btn"
              v-on:click="[addNewQuestion(), closeExpand()]"
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
      <div
        v-show="!this.activeQuestion"
        class="box centerBox"
      >
        <!--Info box-->
        <!--        <div class="box info">
          &lt;!&ndash;        v-on:click="infoExpand"
          v-bind:class="{ infoBig: infoBig, infoSmall: infoSmall }"&ndash;&gt;

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
        </div>-->

        <!--Question box-->
        <!--        <div class="box questionBox">-->
        <!--         v-on:click="questionExpand"
          v-bind:class="{
            questionBig: questionBig,
            questionSmall: questionSmall,
            questionSmallCond: questionSmallCond,
          }"-->

        <!--          <h1>{{ this.uiLabels.createQuestion }}</h1>-->
        <div id="picBox">
          <!--            <h4 style="
                  grid-row: 1;
                  grid-column: 1/ span 2;
                  padding-top: 0">-->
          <p style="grid-column: 1 / span2; grid-row: 1">
            {{ this.uiLabels.addImage }}
          </p>
          <!--            </h4>-->
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
          <textarea
            class="questionArea"
            v-model="questionText"
            v-bind:placeholder="this.uiLabels.questionInfo"
          />
        </div>

        <div id="aBox" >
          {{ this.uiLabels.answer }} <br />
          <div v-if="checked === 'MCQ' || checked === null">
            <!--              <input
                v-for="(_, i) in answers"
                v-model="answers[i]"
                v-bind:key="'answer' + i"
                v-bind:placeholder="this.uiLabels.addanswer"
              />-->

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
            <v-btn
              class="Button addButton greenButton"
              v-on:click="addAnswer">
                <span>
                  {{ uiLabels.AddAnswerAlternative }}
                </span>
            </v-btn>
            <v-btn
              class="Button removeButton redButton"
              v-on:click="removeAnswer">
              <span>
                {{ uiLabels.removeAnswerAlternative }}
              </span>
            </v-btn>

          </div>
          <div v-else-if="checked === 'slider'">
            <label for="minVal"><span style="font-size: 2.5vh">{{ uiLabels.minVal}}</span> </label>
            <input id="minVal" type="number" v-model="sliderMinVal" />
            <br>
            <label for="maxVal"><span style="font-size: 2.5vh">{{ uiLabels.maxVal }}</span> </label>
            <input id="maxVal" type="number" v-model="sliderMaxVal" />
            <br>
            <label for="unit"><span style="font-size: 2.5vh">{{ uiLabels.unit }}</span> </label>
            <input id="unit" type="text" v-model="sliderUnit" placeholder="unit" />
            <br>
            <span style="font-size: 2.5vh">{{uiLabels.chooseValues}}</span>
            <br>
            <Slider
              :poll="false"
              :min="sliderMinVal"
              :max="sliderMaxVal"
              :unit="sliderUnit"
              v-on:sliderValue="getSliderValue"
            />

            <div class="output">
              <span style="font-size: 2.5vh">The lowest acceptable answer is: {{ this.sliderValue[0] }}
                {{ this.sliderUnit }}</span>
            </div>
            <div class="output">
              <span style="font-size: 2.5vh">The actual answer is: {{ this.sliderValue[1] }}
                {{ this.sliderUnit }}</span>
            </div>
            <div class="output">
              <span style="font-size: 2.5vh">The highest acceptable answer is: {{ this.sliderValue[2] }}
                {{ this.sliderUnit }}</span>
            </div>
          </div>
        </div>
        <!--        </div>-->

        <!--Map box-->
        <div class="box map">
          <!--         v-on:click="mapExpand"
                  v-bind:class="{ mapBig: mapBig, mapSmall: mapSmall }"-->
          <div class="mapTitle">
            <h4>
              {{ this.uiLabels.mapPosition }}
              <!--              {{ reactiveProperties.pos }}-->
            </h4>
            <!-- Our map  -->
            <div id="myMap">
              <!--                 v-bind:style="[hideCenter ? 'display:none' : '']">-->
            </div>
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
        <v-btn
          class="Button greenButton saveQuestion"
          v-on:click="[saveQuestion(), (setVisible = true), showSaveBlocker()]"
        >
          <span>{{ uiLabels.Savequestion }}</span>
        </v-btn>

        <br />
        <v-btn class="Button redButton viewQuestion" v-on:click="viewQuestions">
          <span>{{ this.uiLabels.viewQuiz }}</span>
        </v-btn>
        <br />
        <router-link v-bind:to="'/poll/' + lang"
          ><v-btn
            outline
            block
            class="Button goToGame redButton"
            v-on:click="sendGameId"
          >
            <!--          <span class="text">-->
            <span>{{ uiLabels.goToGame }}</span>
            <!--        </span>-->
          </v-btn></router-link
        >
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

<!--
    <div
      v-if="this.activeQuestion"
      v-show="this.activeQuestion"
      class="questionDisplayed"
    >
      <Question v-bind:question="questions[i]" v-on:answer="nextQuestion" />
    </div>
-->

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
            tileSize: 512, //window.polly.position;,
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
        var meIcon = leaflet.icon({
          iconUrl: "img/meIcon.png",
          iconSize: [24, 24], // size of the icon
          iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        });
        marker = leaflet.marker([lat, lng], { icon: meIcon }).addTo(myMap);

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
      questionText: "", // detta är textrutan i overlook - Den funktionen ska vara i questionbox
      questions: [],
      /*info: "",*/
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
      hideCenter: true,
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
      console.log(this.questions);
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
        pos: this.pos, //window.polly.position || [],
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
        pos: this.pos, //window.polly.position || [],
        info: this.info,
        q: this.questionText,
        a: this.answersAlt,
        aS: this.sliderAnswer,
        qId: this.qId,
        pic: this.pic,
      });
    },
    saveQuestion: function () {
      this.questions.find((obj) => obj.qId == this.editingNumber).type =
        this.checked;
      this.questions.find((obj) => obj.qId == this.editingNumber).pos =
        this.question.pos; //window.polly.position;
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

      /*this.clearMap();*/
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

    nextQuestion: function(){
      if ((this.i +1) < this.questions.length){
        this.i++;
      } else {
        this.i = 0;
        this.activeQuestion = false;
      }
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
            qId: this.qId,
            pic: this.pic
          } )
      this.questions.push(
          {gameId: this.gameId,
            q: this.questions,
            a: this.answers,
            info: this.info,
            qId: this.qId}
      );
      this.question = '';
      this.answers = ["", ""];
      this.info = "";
    },*/

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
        qId: this.qId,
      });
    },*/
  },
};
</script>

<style>
/*body {
  margin: 0px;
  min-height: 100%;
  min-width: 100%;
}*/
.pagee {
  background: #2674b0;
  /*background: linear-gradient(#3bc1d9, #2674b0, #27a27a);*/
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
  /*  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 100%;*/
  color: black;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("https://media.istockphoto.com/vectors/city-game-background-vector-id526716884?k=20&m=526716884&s=170667a&w=0&h=eSrH07Do4iPSAQ3i3iukNADDsfnNLoX1LnlUUuhlTO0=");
}
.column {
  float: left;
  width: 30%;
}
.buttonBox {
  float: right;
}
.container {
  /*  padding-top: 15vh;*/
  display: grid;
  width: 100%;
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
  padding: 0;
  margin-top: 5px;
  margin-bottom: 0;
  grid-column: 2;
  grid-row: 1 / span 2;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 20% 15% 20% 35%;
  border-style: dotted;
  background: linear-gradient(#3bc1d9, #2674b0, #27a27a);
}
.toolBox {
  padding-top: 15vh;
  background: linear-gradient(#3bc1d9, #2674b0, #27a27a);
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
  height: 100%;
  padding-top: 2vh;
  grid-column: 2;
  grid-row: 1 / span 2;
}
#aBox {
  height: 100%;
  padding-top: 2vh;
  grid-column: 3;
  grid-row: 1 / span 2;
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
  grid-row: 3 / span 2;
}

#myMap {
  height: 400px;
  /* width: 500px;
  position: absolute; */
}
.blockerAll {
  color: white;
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  opacity: 95%;
  transition: 300ms;
}
.blocker2 {
  color: white;
  grid-column: 2 / span 2;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  opacity: 95%;
  transition: 300ms;
}
.blocker3 {
  color: white;
  grid-column: 2;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  opacity: 95%;
  transition: 300ms;
}
.saveBlocker {
  color: #126514;
  grid-column: 2;
  grid-row: 1 / span 2;
  overflow: hidden;
  background-color: black;
  opacity: 95%;
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
  /*background-color: #000000;*/
  /*padding: 14px 20px;*/
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
.createButton span {
}
.loadButton {
  display: grid;
  width: 60%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}
.loadButton span {
}
.addButton {
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}
.addButton span {
}
.removeButton {
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}
.removeButton span {
}
.addQuestion {
  margin: 0 0;
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}

.removeQuestion {
  margin: 0 0;
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}
.saveQuestion {
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}

.viewQuestion {
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}
.goToGame {
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
.chooseImage span {
}
.questionButton {
  display: grid;
  margin-bottom: 4px;
  width: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  background-image: linear-gradient(144deg, #105646, #b6d7a8ff 50%, #105646);
  /*background-image: linear-gradient(#105646, #1d7658, #b6d7a8ff, #b6d7a8ff);*/
}
.questionButton span {
  background-image: linear-gradient(144deg, #b6d7a8ff, #105646 50%, #b6d7a8ff);
  /*background-image: linear-gradient(#b6d7a8ff, #b6d7a8ff, #1d7658, #105646);*/
  /* padding: 2px 20px; */
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}

.redButton span {
  background-image: linear-gradient(144deg, #881d33, #fa628d 50%, #881d33);
  /*padding: 2px 24px;*/
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}
.greenButton span {
  background-image: linear-gradient(144deg, #126514, #65be51 50%, #126514);
  /*padding: 2px 20px;*/
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

/*
  .break {
    display: none;
  }

  .titleBox h3 {
    float: none;
  }

  .titleBox {
    position: fixed;
    height: 15vh;
    !*    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;*!
    color: black;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.6)
      ),
      url("https://media.istockphoto.com/vectors/city-game-background-vector-id526716884?k=20&m=526716884&s=170667a&w=0&h=eSrH07Do4iPSAQ3i3iukNADDsfnNLoX1LnlUUuhlTO0=");
  }
  .column {
    width: 100%;
  }

  .container {
    padding-top: 15vh;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: 50% 50%;
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

  .Overlook {
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
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;
    grid-column: 2;
    grid-row: 1 / span 2;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 20% 15% 20% 35%;
    border-style: dotted;
    background: linear-gradient(#3bc1d9, #2674b0, #27a27a);
  }

  .toolBox {
    background: linear-gradient(#3bc1d9, #2674b0, #27a27a);

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
    height: 100%;
    padding-top: 2vh;
    grid-column: 1;
    grid-row: 3;
  }

  .map {
    grid-column: 1 / span 3;
    grid-row: 3 / span 2;
  }

  .blockerAll {
    color: white;
    grid-column: 1 / span 3;
    grid-row: 1 / span 2;
    overflow: hidden;
    background-color: black;
    opacity: 95%;
    transition: 300ms;
  }

  .blocker2 {
    color: white;
    grid-column: 2 / span 2;
    grid-row: 1 / span 2;
    overflow: hidden;
    background-color: black;
    opacity: 95%;
    transition: 300ms;
  }

  .blocker3 {
    color: white;
    grid-column: 2;
    grid-row: 1 / span 2;
    overflow: hidden;
    background-color: black;
    opacity: 95%;
    transition: 300ms;
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
    font-size: 1.5vh;
    justify-content: center;
    line-height: 2em;
    max-width: 100%;
    min-width: 80px;
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
}*/
</style>