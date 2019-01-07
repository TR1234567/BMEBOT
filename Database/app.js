const express = require('express');

var app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
var get = require('./get');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/DATA";

console.log('Starting Server');
