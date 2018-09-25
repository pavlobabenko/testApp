import {call, put, takeLatest} from 'redux-saga/effects';
import {setIncomesFromStorage, getIncomesFromStorage} from "../async-storage/incomes";
import {getIncomesFailed, getIncomesSuccess, setIncomesSuccess, setIncomesFailed} from "../action-creators/incomes";
import {GET_INCOMES, SET_INCOMES} from "../action-types/incomes";

function* get() {
    try {
        const data = yield call(getIncomesFromStorage);
        yield put(getIncomesSuccess(data));
    } catch (e) {
        yield put(getIncomesFailed(e));
    }
}

function* set({data}) {
    try {
        yield call(setIncomesFromStorage, data);
        yield put(setIncomesSuccess(data));
    } catch (e) {
        yield put(setIncomesFailed(e));
    }
}

export function* incomes() {
    yield takeLatest(GET_INCOMES, get);
    yield takeLatest(SET_INCOMES, set);
}