import {
    GET_EXPENSES_SUCCESS,
    GET_EXPENSES_FAILED,
    SET_EXPENSES_SUCCESS,
    SET_EXPENSES_FAILED
} from "../action-types/expenses";

const initialState = {
    expenses: [],
    error: null
};
export default ExpensesReducer = (state = initialState, {type, data, error}) => {
    switch (type) {
        case GET_EXPENSES_SUCCESS: {
            return {...state, expenses: data || []}
        }
        case GET_EXPENSES_FAILED: {
            return {...state, error}
        }
        case SET_EXPENSES_SUCCESS: {
            return {...state, expenses: data}
        }
        case SET_EXPENSES_FAILED: {
            return {...state, error}
        }
    default: return state
}
}