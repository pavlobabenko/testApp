import {AsyncStorage} from 'react-native';

export const getExpensesFromStorage = () => {
    return AsyncStorage.getItem('expenses').then(resp => JSON.parse(resp));
};

export const setExpensesFromStorage = (expenses) => {
    return AsyncStorage.setItem('expenses', JSON.stringify(expenses));
};