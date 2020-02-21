const path = require('path');
const appPath = path.dirname(require.main.filename);

module.exports = (app) => {
    app.get('/', function(req, res){
        res.sendFile(appPath + '/index.html');
    });

    app.get('/public/style.css', function(req, res){
        res.sendFile(appPath + '/public/style.css');
    });
}