var path = require('path');
var config = getConfig();
var os = require('os');

var Mailjet = require('node-mailjet').connect(config.mailjet.apiKey, config.mailjet.apiSecretKey);
var sendEmail = Mailjet.post('send');

exports.sendMail = function(tag){
    var emailData = {
        'FromEmail': config.mailjet.fromEmail,
        'FromName': config.mailjet.fromName,
        'Subject': '[' + os.hostname() + '] LERGO ALERT :: ' + tag,
        'Text-part': 'Lergo alerts sent an alert about ' + tag + ' please ssh to machine ' + os.hostname() + ' and investigate' ,
        'Recipients': [{'Email': config.mailjet.to }]
    };

    sendEmail
        .request(emailData)
        .then(function(){ console.log('success',arguments);})
        .catch(function(){console.log('error', arguments)});

};

