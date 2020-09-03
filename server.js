'use strict';

const express = require('express');
const fs = require('fs');
const sharp = require('sharp');
var download = require('download-file')
const http = require('http');
const downloadFile = require('download-file');
const axios = require('axios');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {


    const file = fs.createWriteStream("file.jpg");
    const request = http.get("http://i.imgur.com/G9bDaPH.jpg", function(response) {
        response.pipe(file);

        res.sendFile(__dirname + "file.jpg")

        res.end()
    });



});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);