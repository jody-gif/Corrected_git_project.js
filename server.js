"use strict";

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const port = 8090;


const urlEncodedParser = bodyParser.urlencoded({ extended: false });

// CODE TO CONNECT TO MONGODB DATABASE
/*
//mongoose.connect(mongodb://localhost/vehicles, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected To Database"));
*/

app.use(express.json());
app.use(urlEncodedParser);
app.use(bodyParser.json());


// first loading the application
app.get("", (req, resp) => {
    resp.sendFile(__dirname + "/views/index.html");
})


app.post("/requestRoute", (req, resp) => {
    /* this should go to a page which allows the client to see the details of the route
     * distance
     * duration of travel for requested route
     * available vehicles (and the closest one)
     * other things like cost
    */

    resp.sendFile(__dirname + "/views/index.html");
});

app.listen(port, () => console.log("Our server has started"));
