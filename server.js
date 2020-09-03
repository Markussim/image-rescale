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

    //var url = "http://i.imgur.com/G9bDaPH.jpg"

    axios.get({
            method: "get",
            url: "http://i.imgur.com/G9bDaPH.jpg",
            responseType: "stream"
        })
        .then(function(response) {
            // handle success
            //console.log(response);
            response.data.pipe(fs.createWriteStream('./images/image.jpg'));

            sharp('./images/image.jpg')
                .rotate()
                .resize(parseInt(req.query.size))
                .webp()
                .toBuffer()
                .then(data => {
                    res.write(data, 'binary')
                    res.end(null, 'binary')
                }).catch((error) => {
                    res.write(error.toString())
                    res.end()
                })
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .then(function() {
            // always executed
        });



});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);