import express from 'express';
import app from './app';
import {port} from './../env';

const appServer = app(express());

appServer.listen(port, () => {
    console.log('App listening on port 3000!');
});
