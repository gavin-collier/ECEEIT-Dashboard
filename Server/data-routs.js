var express = require('express');
var router = express.Router();

router.post('/load/racks', async (req, res) => {
    res.sendFile(__dirname + '/data/rackList.json');
});

router.post('/load/server', async (req, res) => {

});

module.exports = router;