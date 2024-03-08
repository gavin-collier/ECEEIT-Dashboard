var express = require('express');
var ping = require('ping');
var router = express.Router();
var rackList = require('./data/rackList.json');
var serverList = require('./data/serverList.json');

router.post('/', async (req, res) => {
    var ipList = [];
    for (let rack of rackList) {
        var newRack = {};
        for (let rackServer in rack) {
            if (rackServer != "name") {

                let pingPromises = serverList.map(server => {
                    if (rack[rackServer] == server.hostname) {
                        return pingServer(server).then(alive => {
                            newRack[rackServer] = alive;
                        });
                    }
                    return Promise.resolve();
                });
                // Wait for all ping operations to complete for the current rack
                await Promise.all(pingPromises);
            }
        }
        ipList.push(newRack);
    }
    res.json(ipList); 
});

async function pingServer(server) {
    let res = await ping.promise.probe(server.ip); 
    return res.alive;
}

module.exports = router;