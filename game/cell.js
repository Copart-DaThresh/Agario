const path = require('path');
const appPath = path.dirname(require.main.filename);
const Color = require(appPath + '/utilities/colors');

module.exports = () => {
    let top = Math.floor(Math.random() * boundaries.top);
    let left = Math.floor(Math.random() * boundaries.left);
    return {
        top: top,
        left: left,
        mass: cells.mass,
        color: Color.getHex(getRandomColor()),
        id: getCellId()
    }
}

function getRandomColor(){
    colors = cells.colors;
    let randInt = Math.floor(Math.random() * colors.length);
    return colors[randInt];
}

function getCellId(){
    let intArr = [];
    while(intArr.length < 15){
        intArr.push(getRandInt());
    }
    return String(intArr.join(''));

    function getRandInt(){
        return Math.floor(Math.random()*100);
    }
}