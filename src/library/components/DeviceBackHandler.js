import React, { Component } from 'react'

import { BackHandler } from 'react-native';

class DeviceBackHandler extends Component {
    constructor(props) {
        super(props);
        console.log("devicie back button init");
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
    componentWillMount() {
        console.log("devicie back button will mount");

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        console.log("devicie back button unmounting");

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {

        const { screen } = this.props;
        if (screen) {
        return this.props.navigation.navigate(screen);

        }
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        console.log("exiting app...");
        BackHandler.exitApp();
        
    }

    render() {
        return null;
    }
}

export default  DeviceBackHandler;
