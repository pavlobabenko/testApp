import {
    GET_INCOMES,
    GET_INCOMES_FAILED,
    GET_INCOMES_SUCCESS,
    SET_INCOMES,
    SET_INCOMES_FAILED,
    SET_INCOMES_SUCCESS
} from "../action-types/incomes";

export const setIncomes = (data) => ({type: SET_INCOMES, data});
export const setIncomesSuccess = (data) => ({type: SET_INCOMES_SUCCESS, data});
export const setIncomesFailed = (error) => ({type: SET_INCOMES_FAILED, error});

export const getIncomes = (data) => ({type: GET_INCOMES, data});
export const getIncomesSuccess = (data) => ({type: GET_INCOMES_SUCCESS, data});
export const getIncomesFailed = (error) => ({type: GET_INCOMES_FAILED, error});