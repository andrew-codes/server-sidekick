import {all, fork} from 'redux-saga/effects';
import {sagas} from './../builds';

export default function* root() {
    yield all([]
        .concat(sagas)
        .map(saga => fork(saga))
    );
}
