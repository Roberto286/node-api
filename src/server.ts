import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import {config} from './config/config';

const router = express();

//connect to mongodb
mongoose.connect(config.mongo.url, {retryWrites: true, w: 'majority'})
.then(() => {console.log('connected!')})
.catch(e => {console.log(e.message)})