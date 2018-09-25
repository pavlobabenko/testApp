import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {getIncomes} from "../../action-creators/incomes";
import {getExpenses} from "../../action-creators/expenses";
import {ExpenseItem} from "../Expenses/ExpenseItem";
import {IncomeItem} from "../Incomes/IncomeItem";

class Home extends React.Component{

    componentDidMount() {
        const {getIncomes, getExpenses} = this.props;
        getIncomes();
        getExpenses();
    }

    getAllExpenses = () => {
        const {expenses} = this.props;
        return expenses.reduce((prev, el) => prev + +el.value, 0);
    };

    getAllIncomes = () => {
        const {incomes} = this.props;
        return incomes.reduce((prev, el) => prev + +el.value, 0);
    };

    navigateToExpenses = () => {
        const {navigate} = this.props.navigation;
        navigate('Expenses');
    };

    navigateToIncomes = () => {
        const {navigate} = this.props.navigation;
        navigate('Incomes');
    };

    render() {
        const {incomes, expenses} = this.props;
        let data = incomes.concat(expenses);
        data = data.sort((a,b) => (
            b.date - a.date
        ));
        const allExpenses = this.getAllExpenses();
        const allIncomes = this.getAllIncomes();
        const balance = allIncomes - allExpenses;
        return (
            <View style={styles.container}>
                <View style={styles.topContent}>
                    <View style={styles.valuesContainer}>
                        <TouchableOpacity style={styles.infoContainer} onPress={this.navigateToExpenses}>
                            <Text style={styles.label}>
                                Expenses
                            </Text>
                            <Text style={styles.expensesText}>
                                {allExpenses > 0 ? `-${allExpenses}` : 0}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infoContainer} onPress={this.navigateToIncomes}>
                            <Text style={styles.label}>
                                Incomes
                            </Text>
                            <Text style={styles.incomesText}>
                                {allIncomes > 0 ? `+${allIncomes}` : 0}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>
                                Balance
                            </Text>
                            <Text style={balance > 0 ? styles.incomesText : balance < 0 ? styles.expensesText : styles.label}>
                                {balance > 0 ? `+${balance}` : balance}
                            </Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    style={styles.list}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        if (item.type === 'income') {
                            return (
                                <IncomeItem
                                    date={item.date}
                                    value={item.value}/>
                            )
                        } else {
                            return (
                                <ExpenseItem
                                    date={item.date}
                                    value={item.value}/>
                            )
                        }
                    }}

                />
            </View>
        )
    }
}

const mapStateToProps = ({expenses, incomes}) => {
    return {
        expenses: expenses.expenses,
        incomes: incomes.incomes
    }
};

const mapDispatchToProps = (dispatch) => ({
    getIncomes: () => (dispatch(getIncomes())),
    getExpenses: () => (dispatch(getExpenses()))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topContent: {

    },
    valuesContainer: {
        flexDirection: 'row'
    },
    infoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 100
    },
    label: {
        fontSize: 20
    },
    incomesText: {
        fontSize: 20,
        color: 'green'
    },
    expensesText: {
        fontSize: 20,
        color: 'red'
    },
    list: {
        flex: 1,
    }
});