import React from 'react';
import {Modal, StyleSheet} from 'react-native';
import {View, TextInput, Button} from 'react-native-ui-lib';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const initState = {
    id: 0,
    value: '',
    date: '',
    description: '',
    category: 0,
    type: 'expense'
};

export default class AddIncomesModal extends React.PureComponent{
    constructor(props) {
        super(props);
        if (props.currentExpense) {
            this.state = {
                ...props.currentExpense,
                date: moment(props.currentExpense.date).format('YYYY-MM-DD HH:mm')
            };
        } else {
            this.state = initState;
        }
    }

    delete = () => {
        this.props.onDelete(this.state);
    };

    isFormInvalid = () => {
        const {value, date} = this.state;
        return !+value || !date;
    };

    handleDate = (date) => {
        this.setState({
            date
        })
    };

    handleDescription = (e) => {
        this.setState({
            description: e
        })
    };

    save = () => {
        const expense = {...this.state};
        if (!this.props.currentExpense) {
            expense.id = +new Date();
        }
        expense.date = moment(expense.date).valueOf();
        this.props.onSave(expense);
    };

    transformValue = (value) => {
        let cleanValue;
        let priceText = '';
        if (value) {
            [cleanValue] = value.match(/^(?:(?:-?(?:0|\d{1,9}))(?:\.\d{0,2})?)|-/) || [''];
            priceText = cleanValue;
        }
        this.setState({
            value: priceText
        });
        return priceText;
    };

    render() {
        const {closeModal, currentExpense} = this.props;
        const {value, description} = this.state;
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={true}>
                <View flex paddingH-25 paddingT-120>
                    <TextInput text50
                               placeholder="Price"
                               dark10
                               value={value}
                               transformer={this.transformValue}/>
                    <DatePicker
                        style={styles.datePicker}
                        date={this.state.date}
                        mode="datetime"
                        placeholder="Select date"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={this.handleDate}
                    />
                    <TextInput text50
                               placeholder="Description"
                               dark10
                               marginT-50
                               value={description}
                               onChangeText={this.handleDescription}/>
                    <View marginT-100 row spread>
                        <Button link text70 orange30 label="Cancel" onPress={closeModal}/>
                        {currentExpense && <Button link text70 outline red10 label="Delete" onPress={this.delete}/>}
                        <Button text70 white background-orange30 disabled={this.isFormInvalid()}
                                label="Save" onPress={this.save}/>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
   datePicker: {
       width: '100%',
       marginBottom: 20
   }
});