var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/e38pLcybATc:APA91bF5ysrrWBGqDgUCG4RtfKEMCcPG3J5yvaGbulSxGl4hdwJCdXHQa3gcO4Oo_f5No1Ow2En7-QhHQNpgBPOXza2uJR-E89EIPd_CxtNgX5ZrOyBdQEy8kAWKUWQZIUvw_TejXI_x",
    "keys": {
        "p256dh": "BHtzSUHvwZRV0/cdWN666Oe+pnQSf33Y+NoXlz7Rqi0Rno17sUs95URsYXS6ZJ+XLO/y8QMpwAJ1Y/GHKa0vzyM=", 
        "auth": "bdRX42Zoa71tPtKUiYMs4Q=="
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