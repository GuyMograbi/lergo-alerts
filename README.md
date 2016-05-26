

How to install?
==================

 - install node 4.2.1
 - npm install -g lergo/lergo-alerts
 - export config file LERGO_ALERTS_CONFIG
 - run `lergo-alerts` ( you might need sudo if you install node as root )

Running detached from session
=============================

If you run `lergo-alerts` and leave the session, the process will be down.

even if you use `lergo-alerts &`.

you can use nohup.

but I recommend on `forever`. read more at : https://github.com/foreverjs/forever


Possible Configurations
========================

```
{
  "mailjet" : {
    "apiKey" :"__mailjet_api_key__",
    "apiSecretKey" : "__mailjet_secret_api_key__",
    "fromEmail" : "__from_email__",
    "fromName" : "__from_name__",
    "to" : "__to__"
  },
  "interval": 60000
}
```

you can find your mailjet api key at : https://app.mailjet.com/account/api_keys

 - *mailjet* - contains mailjet specific configuration
 - *interval* - this value is options


