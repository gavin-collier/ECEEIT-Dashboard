var express = require('express');
var router = express.Router();
var serverList = require('./data/serverList.json');

router.post('/racks', (req, res) => {
    return res.sendFile(__dirname + '/data/rackList.json');
});

router.post('/server', async (req, res) => {
    var success = false;
    serverList.map(server => {
        if (req.body.hostname == server.hostname) {
            success = true;
            return res.send(JSON.stringify(server));
        }
    });

    if (!success){
        return res.send(serverList.find(server =>
            server.hostname === 'ERROR'));
    }
});

module.exports = router;