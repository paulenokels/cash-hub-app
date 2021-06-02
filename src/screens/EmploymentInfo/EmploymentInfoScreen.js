import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from 'library/components/Loading'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { formatCurrency } from 'library/utils/StringUtils'
import ISMaterialPicker from 'library/components/ISMaterialPicker';
import { TextField } from 'react-native-material-textfield';
import DatePicker from 'react-native-date-picker'
import Button from 'apsl-react-native-button'

const moment = require('moment');




import R from 'res/R'

const employmentStatuses = [{ name: 'Employed' }, { name: 'Business Owner' }, { name: 'Unemployed' }];
const employmentSectors = [{ name: 'Agriculture' }, { name: 'Construction/Real Estate' }, { name: 'Consumer Goods' },
{ name: 'Education' }, { name: 'Financial Services' }, { name: 'Healthcare' }, { name: 'Industrial Goods' }, { name: 'Natural Resources' },
{ name: 'NGO' }, { name: 'Oil & Gas' }, { name: 'Services' }, { name: 'Utilities' }, { name: 'Online' }
];

class EmploymentInfoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            employmentStatus: null,
            placeOfWork: "",
            jobTitle: "",
            businessName: "",
            monthlyIncome: "",
            jobStartDate: "",
            employmentSector: "",
            errors: {

            }
        };



    }

    componentDidMount() {

    }


    handleContinue = async () => {
        console.log("handle continue pressed");
        const formValid = await this.validateForm();
        console.log(formValid);
        if (!formValid) return;
        const { employmentStatus, businessName, placeOfWork, jobTitle, monthlyIncome, jobStartDate, employmentSector } = this.state;
        const params = {employmentStatus, businessName, placeOfWork, jobTitle, monthlyIncome, jobStartDate, employmentSector}
        this.props.navigation.navigate('PersonalInfoScreen', params);

        
    }

    async validateForm() {
        const { employmentStatus, businessName, placeOfWork, jobTitle, monthlyIncome, jobStartDate, employmentSector, errors } = this.state;
       await this.setState({errors:{}}); 
        let formValid = true;

        if (!employmentStatus) {
            errors.employmentStatusError = "Please Select Your Employment Status";
            formValid = false;
        }

        if(employmentStatus == 'Employed') {
            if(!jobTitle) {
                errors.jobTitleError = "Please input your job title";
                formValid = false;
            }
            if (!placeOfWork) {
                errors.placeOfWorkError = "Please tell us where you work";
                formValid = false;
            }
            if (!employmentSector) {
                errors.employmentSectorError = "Please provide your employment sector";
                formValid = false;
            }
            if(!jobStartDate) {
                errors.dateError = "Please select your job start date";
                formValid = false;
            }
            if (!monthlyIncome) {
                errors.amountError = "Please input your monthly Income";
                formValid = false;
            }
        }

        if (employmentStatus == 'Business Owner') {
            if (!businessName) {
                errors.businessNameError = "Please tell the name of your business";
                formValid = false;
            }
            if (!employmentSector) {
                errors.employmentSectorError = "Please provide your employment sector";
                formValid = false;
            }
            if (!monthlyIncome) {
                errors.amountError = "Please input your monthly Income";
                formValid = false;
            }
        }

        await this.setState({errors});

        return formValid;

    }


    render() {
        const { employmentStatus, businessName, placeOfWork, jobTitle, monthlyIncome, errors } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>Employment Status</Text>
                    <ISMaterialPicker
                        items={employmentStatuses}
                        label="Select Employment Status"
                        selectedItem={null}
                        errorText={errors.employmentStatusError}
                        onValueChange={async (employmentStatus, index) => {
                            if (index === 0) return this.setState({ employmentStatus: null });
                            await this.setState({ employmentStatus })

                        }}
                    />


                    {employmentStatus == 'Employed' &&
                        <View>
                            <TextField
                                label='Job Title'
                                error={errors.jobTitleError}
                                ref={this.lastNameRef}
                                onChangeText={(jobTitle) => {
                                    this.setState({ jobTitle });
                                }}
                                value={jobTitle}
                                {...R.pallete.textFieldStyle}
                            />
                            <TextField
                                label='Name of Organisation'
                                labelFontSize={12}
                                error={errors.placeOfWorkError}
                                ref={this.lastNameRef}
                                onChangeText={(placeOfWork) => {
                                    this.setState({ placeOfWork });
                                }}
                                value={placeOfWork}
                                {...R.pallete.textFieldStyle}
                            />

                            <Text style={styles.title}>Employment  Sector</Text>
                            <ISMaterialPicker
                                items={employmentSectors}
                                label="Select Employment Sector"
                                selectedItem={null}
                                errorText={errors.employmentSectorError}
                                onValueChange={async (employmentSector, index) => {
                                    if (index === 0) return this.setState({ employmentSector: null });
                                    await this.setState({ employmentSector })

                                }}
                            />


                            <Text>Start Date</Text>
                { errors.dateError && <Text style={{...R.pallete.errorText}}>{errors.dateError}</Text> }

                            <DatePicker
                                date={new Date()}
                                onDateChange={(rawDate) => {
                                    const jobStartDate = moment(rawDate).format("YYYY-MM-DD");
                                    console.log(jobStartDate);
                                    this.setState({ jobStartDate });
                                }}
                                mode="date"
                                androidVariant="nativeAndroid"
                                style={{ marginLeft: -55 }}
                            />
                            <TextField
                                label='Monthly Income'
                                error={errors.amountError}
                                ref={this.amountRef}
                                keyboardType="number-pad"
                                onChangeText={(monthlyIncome) => {
                                    this.setState({ monthlyIncome });
                                }}
                                value={monthlyIncome}

                                {...R.pallete.textFieldStyle}
                            />

                            {monthlyIncome > 0 && <Text style={{ marginTop: 7, marginBottom: 7 }}> {formatCurrency(monthlyIncome)}</Text>}
                        </View>
                    }

                    {employmentStatus == 'Business Owner' &&
                        <View>
                            <TextField
                                label='Name of Organisation'
                                labelFontSize={12}
                                error={errors.businessNameError}
                                ref={this.lastNameRef}
                                onChangeText={(businessName) => {
                                    this.setState({ businessName });
                                }}
                                value={businessName}
                                {...R.pallete.textFieldStyle}
                            />

                           


                            <TextField
                                label='Monthly Income'
                                error={errors.amountError}
                                ref={this.amountRef}
                                keyboardType="number-pad"
                                onChangeText={(monthlyIncome) => {
                                    this.setState({ monthlyIncome });
                                }}
                                value={monthlyIncome}

                                {...R.pallete.textFieldStyle}
                            />

                            {monthlyIncome > 0 && <Text style={{ marginTop: 7, marginBottom: 7 }}> {formatCurrency(monthlyIncome)}</Text>}


                            <Text style={styles.title}>Business Sector</Text>

                            <ISMaterialPicker
                                items={employmentSectors}
                                label="Select Business Sector"
                                selectedItem={null}
                                errorText={errors.employmentSectorError}
                                onValueChange={async (employmentSector, index) => {
                                    if (index === 0) return this.setState({ employmentSector: null });
                                    await this.setState({ employmentSector })

                                }}
                            />
                        </View>


                    }

        { employmentStatus && <Button onPress={() => this.handleContinue()} style={{borderWidth: 0, backgroundColor: 'green'}} textStyle={{ color: 'white'}}>Continue</Button>}

                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8

    },
    title: {
        fontSize: 12,
        marginStart: 8,
    }




})






export default EmploymentInfoScreen;




