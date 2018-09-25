import {
    GET_INCOMES_SUCCESS,
    GET_INCOMES_FAILED,
    SET_INCOMES_SUCCESS,
    SET_INCOMES_FAILED
} from "../action-types/incomes";

const initialState = {
    incomes: [],
    error: null
};
export default IncomesReducer = (state = initialState, {type, data, error}) => {
    switch (type) {
        case GET_INCOMES_SUCCESS: {
            return {...state, incomes: data || []}
        }
        case GET_INCOMES_FAILED: {
            return {...state, error}
        }
        case SET_INCOMES_SUCCESS: {
            return {...state, incomes: data}
        }
        case SET_INCOMES_FAILED: {
            return {...state, error}
        }
        default: return state
    }
}