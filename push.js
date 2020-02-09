var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BNLAFFQcILLAu2fWcZyrJ4BGzG9w6RIWZoqzFJ04Q3FBOfLesIpv7m2ARkAECJvz7vKfwrg2WtSXGL_uBedPpP0", 
    "privateKey": "R8fz9dUv2gHRPMKzaGL3qOsdoOgllvlMGmC4SYvJXYM"
};

webPush.setVapidDetails(
    'mailto:luthfialfarizi98@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eS1wh4dvBpQ:APA91bH3CO0jKZ6w5MXifclEs_KlaWMJAIliGB9GKNCSAuams0SuIoaag7PyAS0WIhskenSnX6whZ2d2wdDHlYwEUOISjM-XfdQjBx0OczAeQVAl9kI_QpUb3FYydpEJ4ubf6amMLeHY",
    "keys": {
        "p256dh": "BP6OQ5u1a/iNRIfr++fQhqpX9+qtIBu08NJSlVusA9ga6cEkU93G+XfOCND8V4ON+tmoHNdOxIdFKSe92EcsJ/0=", 
        "auth": "iS+s1iGjLaWdq0+8o/wAjQ=="
    }
};

var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AIzaSyBan2Rr1padkxH4I2ivGjEi52mEtcdiT_E',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);