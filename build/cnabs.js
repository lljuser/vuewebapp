const path =require('path');

function resovePath(dir) { 
    return path.join(__dirname, '..', dir)
} 
  
function resoveFile(filePath) {
    filePath= resovePath(filePath); 
    return {
        path:filePath,
        filename: path.basename(filePath),
        name: path.basename(filePath,path.extname(filePath)), 
    }
}

function resovePublicFile(entry){
    let dir = 'public/' + entry + ".html";
    return resoveFile(dir);
     
}

function resoveEntryFile(entry){
    let dir = 'src/' + entry + ".js";
    return resoveFile(dir); 
} 

module.exports = {
    index:{
        name: 'index', 
        entry: resoveEntryFile('index').path,
        tmpl: resovePublicFile('index').path,
        output:resovePublicFile('index').filename
    },
    abs:{
        name: 'abs', 
        entry: resoveEntryFile('abs').path,
        tmpl: resovePublicFile('abs').path,
        output:resovePublicFile('abs').filename
    },
    expert:{
        name: 'expert',
        entry: resoveEntryFile('expert').path,
        tmpl: resovePublicFile('expert').path,
        output: resovePublicFile('expert').filename
    },
    product:{
        name: 'product',
        entry: resoveEntryFile('product').path,
        tmpl: resovePublicFile('product').path,
        output: resovePublicFile('product').filename
    },
    trade:{
        name: 'trade',
        entry: resoveEntryFile('trade').path,
        tmpl: resovePublicFile('trade').path,
        output: resovePublicFile('trade').filename
    },
    security:{
        name: 'security',
        entry: resoveEntryFile('security').path,
        tmpl: resovePublicFile('security').path,
        output: resovePublicFile('security').filename
    },
    organ:{
        name: 'organ',
        entry: resoveEntryFile('organ').path,
        tmpl: resovePublicFile('organ').path,
        output: resovePublicFile('organ').filename
    },
    organDeal:{
        name: 'organDeal',
        entry: resoveEntryFile('organDeal').path,
        tmpl: resovePublicFile('organDeal').path,
        output: resovePublicFile('organDeal').filename
    },
    login:{
        name: 'login',
        entry: resoveEntryFile('login').path,
        tmpl: resovePublicFile('login').path,
        output: resovePublicFile('login').filename
    },
}


  
  