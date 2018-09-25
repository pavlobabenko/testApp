import React from 'react';
import {FlatList, View} from 'react-native';
import {Button} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import Modal from './AddIncomesModal';
import {setIncomes} from "../../action-creators/incomes";
import {IncomeItem} from './IncomeItem';

class Incomes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            currentIncome: null
        }
    }

    deleteIncome = (data) => {
        const {incomes, setIncomes} = this.props;
        setIncomes(incomes.filter(el => el.id !== data.id));
        this.toggleModal();
    };

    openIncome = (item) => {
        this.setState({
            currentIncome: item
        }, () => {
            this.toggleModal();
        })
    };

    setIncomes = (data) => {
        const {incomes, setIncomes} = this.props;
        if (this.state.currentIncome) {
            setIncomes(incomes.map(el => {
                if (el.id === data.id) {
                    return data;
                }
                return el;
            }))
        } else {
            setIncomes(incomes.concat([data]));
        }
        this.toggleModal();
    };

    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
            currentIncome: this.state.modalVisible ? null : this.state.currentIncome
        })
    };

    componentDidMount() {
        // this.props.getIncomes();
        // this.props.setIncomes([]);
    }

    render() {
        const {currentIncome, modalVisible} = this.state;
        return (
            <View>
                {modalVisible && <Modal closeModal={this.toggleModal}
                                         onDelete={this.deleteIncome}
                                         onSave={this.setIncomes}
                                         currentIncome={currentIncome}/>}
                <Button onPress={this.toggleModal}
                        fullWidth={true}
                        label={'Add new income'}/>

                <FlatList
                    style={{height: '100%'}}
                    data={this.props.incomes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        return (
                            <IncomeItem
                                date={item.date}
                                value={item.value}
                                onSelect={() => this.openIncome(item)}/>
                        )
                    }}

                />
            </View>
        )
    }
}

const mapStateToProps = ({incomes}) => {
    return {
        incomes: incomes.incomes.sort((a,b) => (
            b.date - a.date
        ))
    }
};

const mapDispatchToProps = (dispatch) => ({
    setIncomes: (data) => (dispatch(setIncomes(data)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Incomes);