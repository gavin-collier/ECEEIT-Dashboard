var express = require('express');
var router = express.Router();

router.post('/racks', (req, res) => {
    res.sendFile(__dirname + '/data/rackList.json');
});

router.post('/server', async (req, res) => {

});

module.exports = router;