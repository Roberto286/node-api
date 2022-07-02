import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import {config} from './config/config';
import Logging from './library/Logging';

const router = express();

//connect to mongodb
mongoose.connect(config.mongo.url, {retryWrites: true, w: 'majority'})
.then(() => {Logging.info('Connected to mongodb')})
.catch(e => {Logging.error('Unable to connect: ');
             Logging.error(e.message)})