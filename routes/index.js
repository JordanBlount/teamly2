const express = require('express');
const router = express.Router();

// const Pusher = require("pusher");

// const pusher = new Pusher({
//   appId: "1329103",
//   key: "5ca7fc6c430a615aad79",
//   secret: "56a109dabd32bea8a6b6",
//   cluster: "us2",
//   useTLS: true
// });

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });

router.get('/', (req, res) => {
    res.send("Hello world.");
});

module.exports = router;