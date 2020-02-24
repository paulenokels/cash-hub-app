import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";



 export default class ISDatePicker extends Component {

    constructor(props) {
        super(props);

        const date = new Date()
        const initialDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        this.state = {
            modalVisible: false,
            date: initialDate
        }
    
       
    }


    onDatePress = () => {
        this.setState({modalVisible: true});
    }

    onConfirm = (date)=> {     
        var date_ = date.toString().split(" ");
        date_ = `${date_[0]} ${date_[1]} ${date_[2]}`;
        this.setState({date:date_, modalVisible: false});
        this.props.dateChanged(date_);

    }

    onCancel =() => {
        this.setState({modalVisible: false});

    }

    render() {
        return (
            <View>
                <View style={styles.picker}>
                    <Text>{this.props.label}: </Text>
                    <TouchableOpacity onPress={this.onDatePress}>
                        <Text style={styles.date}>{this.state.date}</Text>
                    </TouchableOpacity>
                </View>

                <DateTimePickerModal
                        mode={this.props.mode}
                        isVisible={this.state.modalVisible}
                        onConfirm={this.onConfirm}
                        onCancel={this.onCancel}
                    />
                    {this.props.error ? <Text style={styles.errorText}>{this.props.error}</Text>: null }
                    
            </View>
        );
    }
 }
 const styles = StyleSheet.create({

    picker: {
        flexDirection: 'row',
        marginTop: 8,
    },
    date: {
        marginStart: 10,
    },
   
     errorText: {
       fontSize: 13,
       color: 'red',
     }
    
  });