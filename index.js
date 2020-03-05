// LOAD THE LOGGER FIRST
global.Logger = require('./utilities/logger');

Logger.log('Loading the configuration file...');
require('./config/load');

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const expressSession = require('express-session');
const sharedSession = require('express-socket.io-session');
const gameLoop = require('./game/loop');
const createCell = require('./game/cell');
const session = expressSession({
    secret: 'supah_secret_key',
    resave: true,
    saveUninitialized: true
})

Logger.log('Setting server ID...');
const serverId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
Logger.log('Server ID: ' + serverId);

app.use(session);
app.use(require('./middleware/request_log'));

io.use(sharedSession(session, {
    autoSave: true
}));

Logger.log('Requiring routes...');
require('./config/routes')(app);

var playerId = 1;
var players = {};
var playerList = [];
var cells = [];

Logger.log('Requiring player creator...');
const createPlayer = require('./game/player');

function init(socket){
    var session = socket.handshake.session;
    while(players[playerId]){ playerId++; }
    socket.emit('assignId', playerId);
    createPlayer(playerId, socket, players, playerList);
    session.playerId = playerId;
    session.serverId = serverId;
    session.save();
    console.log('User id ' + playerId + ' connected');
    playerId++;
}

io.on('connection', function(socket){
    var session = socket.handshake.session;
    if(session.playerId && session.serverId == serverId){
        console.log('User id ' + session.playerId + ' connnected');
        socket.emit('assignId', session.playerId);
        let player = players[session.playerId];
        player.active = true;
        player.socket = socket;
    } else {
        init(socket);
    }

    socket.on('disconnect', () => {
        let id = session.playerId;
        let player = players[id];
        player.active = false;
        console.log('User id ' + id + ' disconnected');
    });
    socket.on('startMove', (data) => {
        let player = players[data.playerId];
        player.directions[data.direction] = true;
    });
    socket.on('endMove', (data) => {
        let player = players[data.playerId];
        player.directions[data.direction] = false;
    })
});

http.listen(server.port, () => {console.log("App now listening on port " + server.port)});

setInterval(() => {
    gameLoop(playerList, players, io);
}, 15);
setInterval(() => {
    cells.push(createCell());
    io.emit('cells', cells);
}, (2000 / global.cells.rate));