'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.games = {};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

Data.prototype.createGame = function (gameId, lang = "en", gameName) {
  if (typeof this.games[gameId] === "undefined") {
    let game = {};
    game.lang = lang;
    game.name = gameName;
    game.questions = [];
    game.answers = [];
    game.currentQuestion = 0;
    game.participants = [];
    this.games[gameId] = game;
    console.log("game created", gameId, game);
  }
  return this.games[gameId];
}

Data.prototype.addQuestion = function (gameId, q) {
  const game = this.games[gameId];
  //console.log("question added to", gameId, q);
  if (typeof game !== 'undefined') {
    //console.log(game.questions.findIndex(obj => obj.qId == q.qId))
    if (game.questions.findIndex(obj => obj.qId == q.qId) == -1) {
      game.questions.push(q);
    }
    else {
      game.questions[game.questions.findIndex(obj => obj.qId == q.qId)] = q;
    }
    //console.log(game.questions)

  }
}

Data.prototype.joinQuiz = function(gameId, userName) {
  const game = this.games[gameId];
  let user = {}
  if (typeof game !== 'undefined') {
    //console.log(game.questions.findIndex(obj => obj.qId == q.qId))
    user.userName = userName
    user.answers = []
    game.participants.push(user);
  }
  //console.log(game.participants)

}

Data.prototype.getQuestion = function (gameId, qId = null) {
  const game = this.games[gameId];
  console.log("question requested for ", gameId, qId);
  if (typeof game !== 'undefined') {
    if (qId !== null) {
      game.currentQuestion = qId;
    }
    return game.questions[game.currentQuestion];
  }
  return []
}

Data.prototype.submitAnswer = function (gameId, answer, userName) {
  const game = this.games[gameId];
  if (typeof game !== 'undefined') {
    game.participants.find(obj => obj.userName === userName).answers.push(answer)
    console.log(game.participants)
  }
}

/*Data.prototype.submitAnswer = function (gameId, answer, userName) {
  const game = this.games[gameId];
  console.log("answer submitted for ", gameId, answer, userName);
  if (typeof game !== 'undefined') {
    let answers = game.answers[game.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      game.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", game.answers, typeof game.answers);
  }
}*/

Data.prototype.getAnswers = function (gameId) {
  const game = this.games[gameId];
  if (typeof game !== 'undefined') {
    const answers = game.answers[game.currentQuestion];
    if (typeof game.questions[game.currentQuestion] !== 'undefined') {
      return { q: game.questions[game.currentQuestion].q, a: answers };
    }
  }
  return {}
}
module.exports = Data;

