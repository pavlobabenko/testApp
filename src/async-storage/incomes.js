import {AsyncStorage} from 'react-native';

export const getIncomesFromStorage = () => {
    return AsyncStorage.getItem('incomes').then(resp => JSON.parse(resp));
};

export const setIncomesFromStorage = (incomes) => {
    return AsyncStorage.setItem('incomes', JSON.stringify(incomes));
};