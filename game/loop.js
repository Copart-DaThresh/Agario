const generateCell = require('./cell');

module.exports = (playerList, players, io) => {
    let playerPositions = [];
    for(var i = 0; i < playerList.length; i++){
        let playerId = playerList[i];
        let player = players[playerId];
        if(!player.active) { continue; }
        let directions = [null,'left','right','up','down'];
        let positions = ['left', 'top'];
        for(let x = 1; x < directions.length; x++){
            let dir = directions[x];
            if(player.directions[dir]){
                let pos = positions[x / 2 > 1 ? 1 : 0];
                x % 2 != 0 ? add = false : add = true
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