function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());

  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createGame', function (d) {
    socket.emit('gameCreated', data.createGame(d.gameId, d.lang, d.gameName));
  });

  socket.on('addQuestion', function (d) {
    data.addQuestion(d.gameId, { type: d.type, pos: d.pos, q: d.q, a: d.a, aS: d.aS, info: d.info, qId: d.questionNumber, pic: d.pic });
    socket.emit('dataUpdate', data.getAnswers(d.gameId));
  });

  socket.on('joinGame', function (gameId, qId, userName) {
    socket.join(gameId);
    data.joinQuiz(gameId, userName)
    socket.emit('newQuestion', data.getQuestion(gameId, qId))
    socket.emit('dataUpdate', data.getAnswers(gameId));
  });

  socket.on('runQuestion', function (d) {
    io.to(d.gameId).emit('newQuestion', data.getQuestion(d.gameId, d.questionNumber));
    io.to(d.gameId).emit('dataUpdate', data.getAnswers(d.gameId));
  });

  socket.on('submitAnswer', function (d) {
    data.submitAnswer(d.gameId, d.answer, d.userName);
    io.to(d.gameId).emit('dataUpdate', data.getAnswers(d.gameId));
  });

  socket.on('scoreBoard', function (d) {
    socket.emit("newScoreboard", data.getScoreboard(d.gameId, d.userName))
    console.log("efter Newscoreboard emit i sockets")
    io.to(d.gameId).emit('dataUpdate', data.getAnswers(d.gameId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })

}

module.exports = sockets;