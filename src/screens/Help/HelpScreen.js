import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';

import R from 'res/R'

import Icon from 'react-native-vector-icons/FontAwesome5';




 export default class HelpScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      
      loading: false,
    }
    
  }

  doSomething = async () => {
   

  }

  renderHeader() {
    return (
      <TouchableOpacity style={R.pallete.headerStyle} onPress={() => this.props.navigation.goBack(null)}>
          <View >
              <Icon name={'arrow-left'} size={20} color={'#000'}  />
          </View>

          <Text style={R.pallete.headerText}>Get Help</Text>

      </TouchableOpacity>
  );
  }
 

  render() {
    const contactPhone = '2347061097224';
   return (
      
           <View style={styles.container}>
             {this.renderHeader()}
                <ScrollView style={styles.scrollView}>
                   
                <TouchableOpacity style={styles.section} onPress={() => Linking.openURL(`tel:${contactPhone}`)}>
                      <View style={styles.sectionItem}>
                        <View>
                           <Text>Call Us</Text>
                           <Text style={styles.hint}>Our lines are opened 24 hours from Monday to Fridays.</Text>
                        </View>
                        <Icon name={'chevron-right'} size={18} color={'seagreen'} style={styles.icon} />
                      </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.section} onPress={() => Linking.openURL(`https://wa.me/${contactPhone}`)}>
                      <View style={styles.sectionItem}>
                        <View>
                           <Text>WhatsApp Us</Text>
                           <Text style={styles.hint}>Our WhatsApp support is available 24/7.</Text>
                        </View>
                        <Icon name={'chevron-right'} size={18} color={'seagreen'} style={styles.icon} />
                      </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.section} onPress={() => Linking.openURL('mailto:support@cash-hub.com.ng?subject=Support')}>
                      <View style={styles.sectionItem}>
                        <View>
                           <Text>Email Us</Text>
                           <Text style={styles.hint}>We typically respond within 30 minutes.</Text>
                        </View>
                        <Icon name={'chevron-right'} size={18} color={'seagreen'} style={styles.icon} />
                      </View>
                  </TouchableOpacity>


                 
                    

                    <TouchableOpacity style={styles.section} onPress ={() => this.props.navigation.navigate('ContactSupportScreen')}>
                      <View style={styles.sectionItem}>
                        <View>
                           <Text>Write to Us</Text>
                           <Text style={styles.hint}>Our awesome support team is ready to assist you</Text>
                        </View>
                        <Icon name={'chevron-right'} size={18} color={'seagreen'} style={styles.icon} />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.section} onPress={() => Linking.openURL(`https://cash-hub.com.ng/privacy-policy`)}>
                      <View style={styles.sectionItem}>
                        <View>
                           <Text>Privacy Policy</Text>
                           <Text style={styles.hint}>Opens our privacy policy page</Text>
                        </View>
                        <Icon name={'chevron-right'} size={18} color={'seagreen'} style={styles.icon} />
                      </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.section}  onPress={() => Linking.openURL(`https://cash-hub.com.ng/terms`)}>
                      <View style={styles.sectionItem}>
                        <View>
                           <Text>Terms and Conditions</Text>
                           <Text style={styles.hint}>Opens our terms and conditions page</Text>
                        </View>
                        <Icon name={'chevron-right'} size={18} color={'seagreen'} style={styles.icon} />
                      </View>
                    </TouchableOpacity>

                    
                </ScrollView>

            </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1, 
   
  },

  scrollView: {
    marginTop: 10,
    padding: 15
  },

  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
   
  },
  sectionHeader: {
    color: 'seagreen',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  hint: {
    color: 'grey',
    marginBottom: 10
  }

  
});

