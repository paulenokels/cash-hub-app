import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button
   
  } from 'react-native';

export default class NetworkErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            networkError: false
        };
        this.retry = this.retry.bind(this);
    }

    retry() {
        this.props.retry();
    }

    render() {
        return (
            <View style={styles.container}>
                    <Text style={styles.errorText}>Network Error, Check Your Internet Connection and Try Again</Text>
                    <Button style={styles.retryButton} title="Try Again" onPress={this.retry} />
               
            </View>
        )
        
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    retryButton: {
        width: 200,
        marginTop: 4,
        borderRadius: 6,
    }
});