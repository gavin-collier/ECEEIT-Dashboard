var express = require('express');
var http = require("http");
var path = require('path');
const dataRoutes = require('./data-routs');

const port = 3000

const app = express();
let reqPath = path.join(__dirname, '../public/');

app.get('/', (req, res) => {
    res.sendFile(reqPath + "/views/index.html");
})

app.use('/serverData', dataRoutes);

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})