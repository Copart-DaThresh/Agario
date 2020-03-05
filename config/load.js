const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const appPath = path.dirname(require.main.filename);

try {
    let configData = yaml.safeLoad(fs.readFileSync(appPath + '/config.yml', 'utf8'));

    global.server = {
        port: configData.server['port']
    }
    global.boundaries = {
        left: configData.boundaries['left'],
        top: configData.boundaries['top']
    }
    global.logging = {
        excluded: configData.logging['excluded']
    }
    global.cells = {
        mass: configData.cells['cell mass'],
        colors: configData.cells['colors'],
        rate: configData.cells['spawn rate']
    }

} catch(err){
    throw new Error('Cannot load configuration file.');
}