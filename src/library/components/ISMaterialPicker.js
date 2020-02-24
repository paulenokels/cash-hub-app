import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker
} from 'react-native';


/*
 * sample usage
 * <ISMaterialPicker 
                items={countries} 
                label="Select Destination"
                errorText={this.state.errors.countryError}
                onValueChange={async (country, index) => {
                  if (index === 0) return this.setState({country: null});
                 await this.setState({country})
                  this.calculatePremium();

                }}
                />
*/
 export default class ISMaterialPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedItem: null
        }
    

    }

    render() {
        return (
            <View >
                <Picker 
                mode="dropdown" 
                selectedValue={this.state.selectedItem}
                onValueChange={(item, index) => {
                    this.setState({selectedItem: item})
                    this.props.onValueChange(item,index)
                }
                  }>
                <Picker.Item label={this.props.label} value="0" />
                {this.props.items.map((item) => (
                    <Picker.Item label={item.name} value={item.name} />
                ))
            }
              
            </Picker>
            {typeof this.props.errorText != 'undefined' ? <Text style={styles.errorText}>{this.props.errorText}</Text> : null}
            
            </View>
        );
    }
 }
 const styles = StyleSheet.create({
   
     errorText: {
       fontSize: 13,
       color: 'red',
     }
    
  });