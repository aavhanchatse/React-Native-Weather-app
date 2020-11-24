//import liraries
import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Header from '../components/header';
import AsyncStorage from '@react-native-community/async-storage';

// create a component
const Home = ({props, route, navigation}) => {
  const [info, setinfo] = useState({});

  const getWeather = async () => {
    let mycity = await AsyncStorage.getItem('newcity');
    if (!mycity) {
      const {city} = route.params;
      mycity = city;
    }

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${mycity}&appid=693512be484e844931c9a2d921256f74&units=metric
    `)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setinfo({
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          main: data.weather[0].main,
          description: data.weather[0].description,
          pressure: data.main.pressure,
          windspeed: data.wind.speed,
          clouds: data.clouds.all,
          icon: data.weather[0].icon,
        });
      });
    // .catch((err) => {
    //   alert(err.message);
    // });
  };

  if (route.params.city != 'aurangabad') {
    getWeather();
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Header name={info.name} />

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.tempContainer}>
          <Text style={styles.temp}>{info.temp}</Text>
        </View>

        <View style={styles.mainContainer}>
          <Text style={styles.main}>{info.main}</Text>
        </View>
      </View>

      <View style={{flex: 1}}>
        <Text>Description: {info.description}</Text>
        <Text>Humidity: {info.humidity}</Text>
        <Text>Pressure: {info.pressure}</Text>
        <Text>Windspeed: {info.windspeed}</Text>
        <Text>Clouds: {info.clouds}%</Text>
      </View>
      {/* <Image
        style={{height: 120, width: 120}}
        source={{uri: `https://openweathermap.org/img/w/${info.icon}.png`}}
      /> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aeccfc',
  },
  temp: {
    fontSize: 90,
    color: 'white',
  },
  tempContainer: {},
  main: {
    color: 'white',
    fontSize: 25,
  },
  mainContainer: {},
});

//make this component available to the app
export default Home;
