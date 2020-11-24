//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header, Left, Body, Right, Title, Subtitle} from 'native-base';

// create a component
const HeaderTop = ({name}) => {
  return (
    <Header transparent>
      <Body style={{alignItems: 'center'}}>
        <Title style={{color: 'white', fontFamily: 'Open Sans', fontSize: 22}}>{name}</Title>
        {/* <Subtitle>Subtitle</Subtitle> */}
      </Body>
    </Header>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default HeaderTop;
