const path = require('path');
const fs = require('fs-extra');

const appDirectory = fs.realpathSync(process.cwd());
const sourceDir = path.resolve(appDirectory, 'dist');
const publishDir = 'd:\\release\\chineseabs\\webapp';

deploy();

function deploy() {
    console.log('clear project.................');
    //fs.emptyDirSync(publishDir);
    console.log('clear finish.................');
    console.log('publish project.................');
    fs.copySync(sourceDir, publishDir);
    console.log('publish finish.................');
}

 