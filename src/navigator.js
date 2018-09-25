import React from 'react';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import Home from './components/Home/Home';
import Incomes from "./components/Incomes/Incomes";
import Expenses from "./components/Expenses/Expenses";

export default createBottomTabNavigator({
    Home: createStackNavigator({Home}, {
        navigationOptions: {
            title: 'Home'
        }
    }),
    Incomes: createStackNavigator({Incomes}, {
        navigationOptions: {
            title: 'Incomes'
        }
    }),
    Expenses: createStackNavigator({Expenses}, {
        navigationOptions: {
            title: 'Expenses'
        }
    })
});