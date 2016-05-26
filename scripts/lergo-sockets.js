

var execSync = require('child_process').execSync;
var logger = require('log4js').getLogger('lergo-sockets');

// returns true if should dispatch an email
exports.monitor = function(){
    return new Promise(function( resolve ){
        var lergopid = execSync('ps -ef  | grep \' lergo \'  | grep -v grep  | awk \'{print $2}\'').toString().trim();
        logger.info('lergopid is ' + lergopid );
        var command = 'sudo ls -l /proc/' + lergopid + '/fd | wc -l';
        logger.info('running command [' + command + ']');
        var socketsCount = execSync(command);
        logger.info('socketsCount is ' + socketsCount );
        var count = parseInt(socketsCount,10);
        resolve(count > 1000);
    });
};


if (require.main === module) {
    exports.monitor().then(function(result){
        console.log('result is',result);
    });
}