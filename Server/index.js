var express = require('express');
var http = require("http");
var path = require('path');
const dataRoutes = require('./data-routs');
const serverPing = require('./pingServers');

const port = 3000

const app = express();
let reqPath = path.join(__dirname, '../public/');
app.use(express.static(reqPath + '/static'))
app.use(express.static(reqPath + '/views'))
app.use(express.static(reqPath + '/scripts'))
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(reqPath + "/views/index.html");
})

app.use('/load', dataRoutes);
app.use('/ping', serverPing);

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})