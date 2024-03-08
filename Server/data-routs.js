var express = require('express');
var router = express.Router();

router.post('/racks', (req, res) => {
    console.log("sending rack json!")
    res.sendFile(__dirname + '/data/rackList.json');
});

router.get('/test', (req, res) => {
    res.send('Test!');
});

router.post('/server', async (req, res) => {

});

module.exports = router;