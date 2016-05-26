
var path = require('path');
var fs = require('fs-extra');
var filename = path.join(__dirname, 'dev','db.json');

exports.save = function( data ){
    fs.ensureDirSync(path.join(filename,'..'));
    fs.writeFileSync(filename, JSON.stringify(data,{},4));
};

exports.read = function(){
    try{
        return require(filename);
    }catch(e){
        return {};
    }
};