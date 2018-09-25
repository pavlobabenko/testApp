import {all} from 'redux-saga/effects';

import {incomes} from "./incomes";
import {expenses} from "./expenses";

export default function* rootSaga() {
    yield all([
        incomes(),
        expenses()
    ]);
}