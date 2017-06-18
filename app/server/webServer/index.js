import express from 'express';
import app from './app';
import {port} from './../env';
import {log} from './../logger';

const appServer = app(express());

appServer.listen(port, () => {
    log('App listening on port 3000!');
});
