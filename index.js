#!/usr/bin/env node

global.getConfig = function(){
    var configPath = process.env.LERGO_ALERTS_CONFIG || './dev/config.json';
    return require(configPath);
};

var _ = require('lodash');
var scripts = require('./scripts');
var mailer = require('./mailsender');
var db = require('./db');

var logger = require('log4js').getLogger('lergo-monitor.index');


var config = getConfig();

function monitor(){
    _.each(scripts, function( scriptObj, tag ){
        scriptObj.monitor().then(function( result ){
            var dbContent = db.read();
            console.log('dbContent', dbContent);
            // send email if first encounter or hour interval passed.
            if ( result && ( !dbContent[tag] || ( dbContent[tag] + 60 * 1000 * 60 < new Date().getTime()  ) )  ){
                logger.info('sending email about ' + tag);
                logger.info('!dbContent[tag]', !dbContent[tag]);
                logger.info('dbContent[tag] + 60 * 1000 * 60 < new Date().getTime() ',dbContent[tag] + 60 * 1000 * 60 < new Date().getTime() );
                dbContent[tag] = new Date().getTime();
                db.save(dbContent);
                mailer.sendMail(tag);
            } else if ( !result && dbContent.hasOwnProperty(tag) ) {
                delete dbContent[tag];
                db.save(dbContent);
            }
        })
    });

}

process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging here
});

process.on('uncaughtException', function(err){
    console.log('Caught exception:',err);
});


setInterval(monitor, config.interval || 60 * 1000);
