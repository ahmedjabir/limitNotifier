import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as coinDeskActions from './src/actions/coinDeskActions'
import AsyncStorage from '@react-native-community/async-storage'
import { 
  LIMIT_VALUES_ORDER_ERROR_MESSAGE, 
  LIMIT_STORED_VALUES_KEY, 
  NEW_RATE_REACHED_MIN_LIMIT_MESSAGE, 
  NEW_RATE_REACHED_MAX_LIMIT_MESSAGE,
  RATE_ALERT } from './src/constants'
import Notifications from './src/services/Notifications'

const MINUTE_MS = 10000;

const styles = StyleSheet.create({
  root: {
    flex:1,
    alignItems:'center'
  },
  header: {
    width:'80%',
    height:'10%',
    alignItems:'center',
    justifyContent:'center',
  },
  headerTitle: {
    fontSize:18,
  },
  subContainer: {
    width:'80%',
  },
  title: {
    marginBottom:5,
    fontSize:18
  },
  textInput: {
    backgroundColor:'lightgray',
    borderColor:'darkgray',
    borderWidth:1,
    borderRadius:5,
    height:44
  },
  footer: {
    width:'100%',
    height: 44,
    marginTop:30,
    flexDirection:'row',
    borderWidth:1,
    borderColor:'gray',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:0
  },
  setLimitButton: {
    width:'100%',
    height: 44,
    marginTop: 20,
    backgroundColor:'blue',
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center'
  },
  setLimitTitle: {
    color:'white',
    fontSize:18,
  },
  lastUpdatedDateTime: {
    marginLeft:5
  }
});


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      fromValue: 0.0,
      toValue: 0.0
    }
    this.interval = null
  }



  showtNotification = (title, message) => {
    Notifications.schduleNotification(title, message, new Date(Date.now()));
  };
  

    
  // Life Cycle Methods

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {fromValue, toValue } = this.state;
    const updatedRate = nextProps?.coinDesk?.data?.bpi?.USD?.rate_float

    // Check and alert the user, if the new rate matchs the limits range.
    if (updatedRate) {
      if (updatedRate < fromValue) {
        // Since iOS does not show notification while app is in foreground so showing alert instead.
        (Platform.OS === 'ios') ? alert(NEW_RATE_REACHED_MIN_LIMIT_MESSAGE) : this.showtNotification(RATE_ALERT, NEW_RATE_REACHED_MIN_LIMIT_MESSAGE)
      }
      else if (updatedRate > toValue) {
        (Platform.OS === 'ios') ? alert(NEW_RATE_REACHED_MAX_LIMIT_MESSAGE) : this.showtNotification(RATE_ALERT, NEW_RATE_REACHED_MAX_LIMIT_MESSAGE)
      }
    }
  }

  componentDidMount() {

    // Fetch first rates
    this.fetchCurrentRate();
    
    // Start auto fetching rates based on the time interval.
    this.interval = setInterval(() => {this.fetchCurrentRate()}, MINUTE_MS);    

    // Retrive last limit values
    AsyncStorage.getItem(LIMIT_STORED_VALUES_KEY).then((limitObject) => {
      const limitObjectParsed = JSON.parse(limitObject)
      this.setState({
        fromValue: limitObjectParsed?.fromValue ?? 0,
        toValue: limitObjectParsed?.toValue ?? 0
      })
    })    
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  
  // Actions Methods

  fetchCurrentRate() {  
    const { coinDeskActions } = this.props
    coinDeskActions.getUpdatedRate()
  }


  saveLimit() {
    const { fromValue, toValue } = this.state

    if (fromValue < toValue) {
      const limitObject = {
        fromValue,
        toValue
      }
      AsyncStorage.setItem(LIMIT_STORED_VALUES_KEY, JSON.stringify(limitObject))
    }
    else
    {
      alert(LIMIT_VALUES_ORDER_ERROR_MESSAGE)
    }
  }



  // UI Render Methods

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Limit Notifier</Text>
      </View>
    )
  }

  renderBody() {
    const { fromValue, toValue } = this.state
    // alert(fromValue)
    return (
      <View style={styles.subContainer}>
        <Text style={styles.title}>From Value</Text>
          <TextInput 
            style={styles.textInput}
            placeholder='Enter value'
            value={fromValue.toString()}
            onChangeText={(newText) => this.setState({fromValue: newText})}
            keyboardType="numeric">
          </TextInput>

          <Text style={[styles.title, {marginTop:20}]}>To Value</Text>
          <TextInput 
            style={styles.textInput}
            placeholder='Enter value'
            value={toValue.toString()}
            onChangeText={(newText) => this.setState({toValue: newText})}
            keyboardType="numeric">
          </TextInput>
        
          <TouchableOpacity
            style={styles.setLimitButton}
            onPress={() => {this.saveLimit()}}>
            <Text style={styles.setLimitTitle}>Set Limit</Text>
          </TouchableOpacity>
      </View>
    )
  }

  renderFooter() {
    const { coinDesk } = this.props;
    return (
      <View style={styles.footer}>
        <Text>Last Updated:</Text>
        <Text style={styles.lastUpdatedDateTime}>{JSON.stringify(coinDesk?.data?.time?.updated)}</Text>
      </View>
    )
  }

  render() {
    return (      
    <SafeAreaView style={styles.root}>
      {this.renderHeader()}
      {this.renderBody()}
      {this.renderFooter()}
    </SafeAreaView>
    )
  };
};

export default connect(
  state => ({
      coinDesk: state.coinDesk,
  }),
  dispatch => ({
      coinDeskActions: bindActionCreators(coinDeskActions, dispatch)
  })
)(App);
