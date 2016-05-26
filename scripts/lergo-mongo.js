var execSync = require('child_process').execSync;
var logger = require('log4js').getLogger('lergo-mongo');

exports.monitor = function(){
    return new Promise(function(resolve){
        var status  = execSync('sudo service mongodb status');
        logger.info('status is [' + status + ']');
        resolve(status.indexOf('start/running') < 0);
    });
};


if (require.main === module) {
    exports.monitor().then(function(result){
        console.log('result is ', result);
    });
}