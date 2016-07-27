import React from 'react';
import {Text} from 'react-native';
import {Container, Header, Content, Button, Icon, List, ListItem} from 'native-base';

import {styles} from "../lib/styles";

const PlacesIndexPage = React.createClass({
  componentWillMount: function(){  console.log("PLACES INDEX WILL MOUNT")  },
  componentDidMount: function(){  console.log("PLACES INDEX DID MOUNT")  },
  componentWillReceiveProps: function(nextProps){  console.log("PLACES INDEX WILL RECEIVE PROPS", nextProps)  },
  //componentWillUpdate: function(nextProps, nextState){  console.log("PLACES INDEX WILL RECEIVE PROPS", nextProps, nextState)  },
  //componentDidUpdate: function(prevProps, prevState){  console.log("PLACES INDEX DID UPDATE", prevProps, prevState)  },
  componentWillUnmount: function(){  console.log("PLACES INDEX WILL UNMOUNT")  },

  render: function(){
    var beacons = this.props.nearbyBeacons;
    var component = this;

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Button transparent onPress={this.goBack}>
            <Icon name="md-arrow-back" style={styles.backIcon}/>
          </Button>
          <Text style={styles.title}>Nearby Places of Interest ({beacons.length})</Text>
        </Header>

        <Content>
          <List>
            {
              beacons.map(function(beacon){
                return (
                  <ListItem key={component.beaconId(beacon)} itemDivider={component.isEvenNumber(beacons.indexOf(beacon))}>
                    <Button transparent onPress={component.goShow}>
                      <Text>{component.beaconPrettyProximity(beacon)}</Text>
                    </Button>
                  </ListItem>
                );
              })
            }
          </List>
        </Content>
      </Container>
    );
  },

  goBack: function(){
    this.props.navigator.push({
      name: 'Home',
      type: "Back"
    })
  },

  goShow: function(){
    this.props.navigator.push({
      name: 'Place',
      passProps:{
        nearbyBeacons:[],
        beacon: {}
      }
    })
  },

  isEvenNumber: function(listItemIndex){
    console.log("INDEX", listItemIndex, "SHOULD BE DIVIDED?", (listItemIndex % 2) == 0)
    return (listItemIndex % 2) == 0
  },

  beaconId: function(beacon){
    return beacon.uuid + "..." + beacon.major + "..." + beacon.minor
  },

  beaconPrettyProximity: function(beacon){
    if (beacon) {
      return beacon.proximity.toLocaleUpperCase() + " @ " + beacon.distance.toFixed(2) + " meters (" + beacon.rssi + " strength)"
    } else {
      return "N/A"
    }
  }

});

module.exports = PlacesIndexPage;
