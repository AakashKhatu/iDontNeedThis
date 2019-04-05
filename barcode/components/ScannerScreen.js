import React, { Component } from 'react';
import ReactTimeout from 'react-timeout'
import axios from 'axios';

import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanScreen extends Component {

  state = {
    splash: true,
    scanned: false,
    loaded: false,
    data: ''
  }

  constructor(props) {
    super(props);
    this.closesplash = this.closesplash.bind(this);
  }

  onSuccess(e) {
    const data = e.data;
    this.setState({scanned: true});
    axios.get('http://192.168.0.8:8000/scan/?id=1234&open=True').then((res) => {
      this.setState({loaded: true, data: JSON.stringify((res.data))});
      console.log(res.data);
    }).catch(e => {
      console.log(e);
    });
  }

  componentDidMount() {
    const t = this;
    this.props.setTimeout(this.closesplash, 6000);
  }

  closesplash() {
    this.setState({splash: false});
  }


  handleClick() {
    console.log('clicked')
    this.setState({loaded: false});
    axios.get('http://192.168.0.8:8000/scan/?id=1234&open=False').then((res) => {
      this.setState({scanned: false,  data:''});
      console.log(res.data);
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    const {scanned, loaded, data, splash} = this.state;
    return (
      <View style={styles.upper}>
      <StatusBar backgroundColor="#B71C1C" barStyle="light-content" />
      {splash && <View style={styles.splash}>
        <Image source={require('./ic_launcher.png')} />
        <Text style={styles.splash_heading}>iDontNeedThis</Text>  
        <Text style={styles.splash_sub}>Scan a QR Code to open your box.</Text>
      </View>}
      {(!scanned && !splash)&& <QRCodeScanner
      ref={(node) => { this.scanner = node }}
        onRead={this.onSuccess.bind(this)}
        cameraStyle={styles.main}
        containerStyle={styles.cont}
        markerStyle={styles.marker}
        topContent={
          <Text style={styles.centerText}>
            Go to the box and scan the QR code.
          </Text>
        }
      />}
      { scanned &&
        <View style={styles.scanned}>
          {!loaded && <Text style={styles.scanned_loading}>Loading</Text>}
          {(loaded) && <Text style={styles.scanned_loading}>{data}</Text>}
          {(loaded) && <Button color="#B71C1C" title="Close Box" onPress={this.handleClick.bind(this)} style={styles.scanned_button}/>}
        </View>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#fff',
  },
  main: {
    height: 800,
  },
  cont: {
    height: 800,
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  marker: {
    borderColor: '#B71C1C',
  },
  buttonText: {
    fontSize: 21,
    color: '#fff',
  },
  buttonTouchable: {
    height: 90,
    backgroundColor: '#B71C1C',
    flex:1,
  },
  upper: {
    flexDirection: 'column'
  },
  scanned: {
    flexDirection: 'column',
    height: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scanned_loading: {
    fontSize:30,
    textAlign: 'center',
  },
  scanned_button: {
    backgroundColor: '#B71C1C',
    marginTop: 20
  },
  splash: {
    backgroundColor: '#B71C1C',
    height: 700,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splash_heading: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  splash_sub: {
    color: '#fff',
    fontSize: 20,
  }
});

export default ReactTimeout(ScanScreen);