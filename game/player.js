module.exports = (id, socket, players, playerList) => {
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
        'mass': 50,
        'active': true
    }
    players[id] = player;
    playerList.push(id);
    return player;
}