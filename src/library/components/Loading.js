import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
  
   
  } from 'react-native';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        
    }

   

    render() {
        return (
            <View style={styles.container}>
               
                    <ActivityIndicator />
                    <Text>{this.props.text}</Text>
                </View>
        )
        
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});