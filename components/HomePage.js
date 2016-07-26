import React from 'react';
import {AppRegistry, Text} from 'react-native';
import {Container, Header, Footer, Content, Button, Icon, List, ListItem, Spinner} from 'native-base';

import {styles} from "../lib/styles";
import {beaconsDidRangeResult} from "../lib/beacons_did_range_example_result";

const HomePage = React.createClass({
  getInitialState: function(){
    console.log("HOME GETTING INITIAL STATE")
    return {nearbyBeacons:[], displaySpinner:false}
  },

  componentWillMount: function(){  console.log("HOME WILL MOUNT")  },
  componentDidMount: function(){  console.log("HOME DID MOUNT")  },
  componentWillUnmount: function(){  console.log("HOME WILL UNMOUNT")  },

  render: function(){
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Text style={styles.title}>Beacon Navigator</Text>
        </Header>

        <Content style={styles.content}>
          <Text style={styles.text}>Tap the button to detect nearby points of interest based on proximity to Bluetooth beacons.</Text>

          {this.state.displaySpinner ? <Spinner color="#428bca" size="large"/> : null}
        </Content>

        <Footer style={styles.footer}>
          <Button style={styles.button} onPress={this.handleButtonPress}>
            <Icon name="ios-radio-outline" />
          </Button>
        </Footer>
      </Container>
    );
  },

  handleButtonPress: function(){
    //this.setState({displaySpinner: true})
    //var component = this;
    //setTimeout(function(){
    //  component.setState({
    //    displaySpinner: false,
    //    nearbyBeacons: beaconsDidRangeResult
    //  })
    //}, 5000);

    this.props.navigator.push({
      name: 'BeaconsIndex',
      passProps: {
        beaconCount: 5
      }
    })

  }

});

module.exports = HomePage;