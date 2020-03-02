const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const appPath = path.dirname(require.main.filename);

try {
    let configData = yaml.safeLoad(fs.readFileSync(appPath + '/config.yml', 'utf8'));

    global.boundaries = {
        left: configData.boundaries['left'],
        top: configData.boundaries['top']
    }
    global.logging = {
        excluded: configData.logging['excluded']
    }

} catch(err){
    throw new Error('Cannot load configuration file.');
}