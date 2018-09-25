import {
    GET_EXPENSES,
    GET_EXPENSES_FAILED,
    GET_EXPENSES_SUCCESS,
    SET_EXPENSES,
    SET_EXPENSES_FAILED,
    SET_EXPENSES_SUCCESS
} from "../action-types/expenses";

export const setExpenses = (data) => ({type: SET_EXPENSES, data});
export const setExpensesSuccess = (data) => ({type: SET_EXPENSES_SUCCESS, data});
export const setExpensesFailed = (error) => ({type: SET_EXPENSES_FAILED, error});

export const getExpenses = (data) => ({type: GET_EXPENSES, data});
export const getExpensesSuccess = (data) => ({type: GET_EXPENSES_SUCCESS, data});
export const getExpensesFailed = (error) => ({type: GET_EXPENSES_FAILED, error});