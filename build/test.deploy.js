const path = require('path');
const fs = require('fs-extra');

const appDirectory = fs.realpathSync(process.cwd());
const sourceDir = path.resolve(appDirectory, 'dist');
const publishDir = 'd:\\release\\chineseabs\\webapp'; 

function deploy() { 
    if (fs.existsSync(publishDir)) {
        console.log('clear project.................');
        fs.emptyDirSync(publishDir);
        console.log('clear finish.................');
        console.log('publish deploy project.................'); 
        fs.copySync(sourceDir, publishDir);
        console.log('publish deploy finish.................');
    } 
}

module.exports = deploy;

 