var express = require('express');
var router = express.Router();
var serverList = require('./data/serverList.json');

router.post('/racks', (req, res) => {
    return res.sendFile(__dirname + '/data/rackList.json');
});

router.post('/server', async (req, res) => {
    var responseSent = false;

    for (const server of serverList) {
        if (req.body.hostname == server.hostname) {
            responseSent = true;
            return res.send(JSON.stringify(server));
        }
    }

    if (!responseSent) {
        return res.send(serverList.find(server => server.hostname === 'ERROR'));
    }
});

module.exports = router;