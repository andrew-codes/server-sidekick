import {all, fork} from 'redux-saga/effects';
import buildSagas from './builds/sagas';

const sagas = []
    .concat(buildSagas);

export default function* root() {
    yield all(sagas
        .map(saga => fork(saga))
    );
}
