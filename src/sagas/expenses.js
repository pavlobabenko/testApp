import {call, put, takeLatest} from 'redux-saga/effects';
import {setExpensesFromStorage, getExpensesFromStorage} from "../async-storage/expenses";
import {getExpensesSuccess, getExpensesFailed, setExpensesSuccess, setExpensesFailed} from "../action-creators/expenses";
import {GET_EXPENSES, SET_EXPENSES} from "../action-types/expenses";

function* get() {
    try {
        const data = yield call(getExpensesFromStorage);
        yield put(getExpensesSuccess(data));
    } catch (e) {
        yield put(getExpensesFailed(e));
    }
}

function* set({data}) {
    try {
        yield call(setExpensesFromStorage, data);
        yield put(setExpensesSuccess(data));
    } catch (e) {
        yield put(setExpensesFailed(e));
    }
}

export function* expenses() {
    yield takeLatest(GET_EXPENSES, get);
    yield takeLatest(SET_EXPENSES, set);
}