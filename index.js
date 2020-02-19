const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const expressSession = require('express-session');
const sharedSession = require('express-socket.io-session');
const port = 8000;
const session = expressSession({
    secret: 'supah_secret_key',
    resave: true,
    saveUninitialized: true
})

const boundaries = {
    top: 900,
    left: 1500
};

app.use(session);

io.use(sharedSession(session, {
    autoSave: true
}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/public/style.css', function(req, res){
    res.sendFile(__dirname + '/public/style.css');
});

var playerId = 1;
var players = {};
var playerList = [];

function createPlayer(id, socket){
    let player = {
        'id': id,
        'socket': socket,
        'directions': {
            'up': false,
            'right': false,
            'down': false,
            'left': false
        },
        'position': {
            'left': 250,
            'top': 250
        },
        'active': true
    }
    players[id] = player;
    playerList.push(id);
    return player;
}

io.on('connection', function(socket){
    var session = socket.handshake.session;
    if(session.playerId){
        console.log('User id ' + session.playerId + ' connnected');
        socket.emit('assignId', session.playerId);
        let player = findPlayerObj(session.playerId);
        player.active = true;
        player.socket = socket;
    } else {
        socket.emit('assignId', playerId);
        createPlayer(playerId, socket);
        session.playerId = playerId;
        session.save();
        console.log('User id ' + playerId + ' connected');
        playerId++;
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

http.listen(port, () => {console.log("App now listening on port 8000")});

function runGameLoop(){
    let playerPositions = [];
    for(var i = 0; i < playerList.length; i++){
        let playerId = playerList[i];
        let player = players[playerId];
        if(!player.active) { continue; }
        let directions = [null,'left','right','up','down'];
        let positions = ['left', 'top'];
        for(var i = 1; i < directions.length; i++){
            let dir = directions[i];
            if(player.directions[dir]){
                let pos = positions[i / 2 > 1 ? 1 : 0];
                i % 2 != 0 ? add = false : add = true
                let pxSpeed = 5;
                add ? newVal = player.position[pos] + pxSpeed : newVal = player.position[pos] - pxSpeed;
                if(newVal > 0 && newVal < boundaries[pos]){
                    player.position[pos] = newVal;
                }
            }
        }
        playerPositions.push({
            id: playerId,
            position: player.position
        });
    }
    io.emit('position', playerPositions);
}

setInterval(runGameLoop, 15);