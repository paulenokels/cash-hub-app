import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from 'library/components/Loading'

import Icon from 'react-native-vector-icons/FontAwesome5';

import R from 'res/R';

import LoanService from 'services/LoanService';

import { formatCurrency } from 'library/utils/StringUtils'
import { greaterThan } from 'react-native-reanimated';


const moment = require('moment');



class MyLoansScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loans: null,
        };



    }

    componentDidMount() {
        this.getLoans();
    }

    getLoans = async () => {

        const req = await LoanService.getUserLoans();
        const res = req.data;
        if (res.success) {
            this.setState({ loading: false, loans: res.loans });
        }
    }

    renderHeader() {
        return (
            <View style={R.pallete.headerStyle}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                    <Icon name={'arrow-left'} size={20} color={'#000'} />
                </TouchableOpacity>

                <Text style={R.pallete.headerText}>My Loans</Text>

            </View>
        );
    }

    renderLoan(loan, index) {
        let approvedAndPaidBack = null;
        if (loan.status == 'APPROVED') {
            if (loan.paid_back == 0) {
                approvedAndPaidBack = false;
            }
            else if (loan.paid_back == 1) {
                approvedAndPaidBack = true;
            }
        }

        return (
            <TouchableOpacity style={styles.loanWrapper} index={index} onPress={() => this.props.navigation.navigate('LoanInfoScreen', {loan})}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{padding: 2}}>
                  <Icon onPress={() => { }} name="wallet" size={45} style={{ paddingStart: 6, marginTop: 2 }} color="green" />

                    </View>
                    <View>
                        <Text style={styles.amount}>{formatCurrency(loan.amount)}</Text>
                        <Text>{loan.status}</Text>
                    </View>

                </View>

                <View>
                    <Text>Due Date: {moment(loan.payback_date).format("MMM Do YYYY")}</Text>
                    { approvedAndPaidBack == false &&  
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoanInfoScreen', {loan})}>
                        <Text style={styles.payNowText}>Payback Now</Text>
                    </TouchableOpacity>
                    }

                { approvedAndPaidBack == true &&  
                    <View>
                        <Text style={{color: R.colors.appPrimary, fontWeight: 'bold'}}><Icon name='check'  size={13} color={R.colors.appPrimary}  />Loan paid back</Text>
                    </View>
                    }
                </View>

            </TouchableOpacity>
    );
    }


    render() {
        const { loading, loans } = this.state;
        return (
            <View style={styles.container}>
                {this.renderHeader()}

                { loading ? <Loading text="Getting your loans..." /> :
                    <View>
                        {loans && loans.length > 0 ?
                            <>
                                {loans.map((loan, index) => {
                                    return this.renderLoan(loan, index);
                                })}
                            </>
                            :
                            <View>
                                <Text style={{textAlign: 'center', marginTop: 20}}>You have not applied for any loans</Text>
                            </View>
                        }
                    </View>
                }
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    loanWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 15,

    },
    amount: {
       
        padding: 2,
        color: 'green',
        fontWeight: 'bold',
        fontSize: 16
    },
    payNowText: {
        color: R.colors.appPrimary,
        padding: 7,
        borderRadius: 6,
        borderWidth: 1,
        alignSelf: "flex-end"
    }




})






export default MyLoansScreen;




