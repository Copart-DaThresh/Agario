const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 8000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/public/style.css', function(req, res){
    res.sendFile(__dirname + '/public/style.css');
});

var playerId = 1;
var playerList = [];

function createPlayer(id, socket){
    playerList.push({
        'id': id,
        'socket': socket,
        'directions': {
            'up': false,
            'right': false,
            'down': false,
            'left': false
        },
        'position': {
            'left': 50,
            'top': 50
        }
    })
}

io.on('connection', function(socket){
    socket.emit('assignId', playerId);
    createPlayer(playerId, socket);
    playerId++;
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    socket.on('startMove', (data) => {
        let id = data.player;
        for(var i = 0; i < playerList.length; i++){
            if(playerList[i].id == id){
                playerList[i].directions[data.direction] = true;
            }
        }
    });
    socket.on('endMove', (data) => {
        let id = data.player;
        for(var i = 0; i < playerList.length; i++){
            if(playerList[i].id == id){
                playerList[i].directions[data.direction] = false;
            }
        }
    })
});

http.listen(port, () => {console.log("App now listening on port 8000")});

function runGameLoop(){
    for(var i = 0; i < playerList.length; i++){
        let player = playerList[i];
        if(player.directions.up){
            player.position.top -= 20;
        }
        if (player.directions.down){
            player.position.top += 20;
        }
        if(player.directions.right){
            player.position.left += 20;
        }
        if (player.directions.left){
            player.position.left -= 20;
        }
        player.socket.emit('position', player.position);
    }
}

setInterval(runGameLoop, 100);