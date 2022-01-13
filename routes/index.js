const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// const Pusher = require("pusher");

// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
//   useTLS: true
// });

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });

router.get('/', (req, res) => {
    res.send("Hello world.");
});

module.exports = router;