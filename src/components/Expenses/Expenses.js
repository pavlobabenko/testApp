import React from 'react';
import {FlatList, View} from 'react-native';
import {Button} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import Modal from './AddExpensesModal';
import {setExpenses} from "../../action-creators/expenses";
import {ExpenseItem} from "./ExpenseItem";

class Expenses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            currentExpense: null
        }
    }

    deleteExpense = (data) => {
        const {expenses, setExpenses} = this.props;
        setExpenses(expenses.filter(el => el.id !== data.id));
        this.toggleModal();
    };

    openExpense = (item) => {
        this.setState({
            currentExpense: item
        }, () => {
            this.toggleModal();
        })
    };

    setExpenses = (data) => {
        const {expenses, setExpenses} = this.props;
        if (this.state.currentExpense) {
            setExpenses(expenses.map(el => {
                if (el.id === data.id) {
                    return data;
                }
                return el;
            }))
        } else {
            setExpenses(expenses.concat([data]));
        }
        this.toggleModal();
    };

    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
            currentExpense: this.state.modalVisible ? null : this.state.currentExpense
        })
    };

    componentDidMount() {
        // this.props.getExpenses();
        // this.props.setExpenses([]);
    }

    render() {
        const {currentExpense, modalVisible} = this.state;
        return (
            <View>
                {this.state.modalVisible && <Modal closeModal={this.toggleModal}
                                                   onSave={this.setExpenses}
                                                   onDelete={this.deleteExpense}
                                                   currentExpense={this.state.currentExpense}/>}
                <Button onPress={this.toggleModal}
                        fullWidth={true}
                        label={'Add new expense'}/>

                <FlatList
                    style={{height: '100%'}}
                    data={this.props.expenses}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        return (
                            <ExpenseItem
                                date={item.date}
                                value={item.value}
                                onSelect={() => this.openExpense(item)}/>
                        )
                    }}

                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      expenses: state.expenses.expenses.sort((a,b) => (
          b.date - a.date
      ))
  }
};

const mapDispatchToProps = (dispatch) => ({
    setExpenses: (data) => (dispatch(setExpenses(data)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);