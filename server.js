const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Config
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB
mongoose.connect("mongodb://localhost/Algos")

//Routes
require("./server/Routes.js")(app);

//Port
app.listen(8000, () => console.log("listening on port 8000"));