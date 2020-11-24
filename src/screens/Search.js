//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, Text, CardItem, Body} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const Search = ({navigation}) => {
  const [city, setcity] = useState('');
  const [address, setaddress] = useState([]);
  const [cities, setcities] = useState([]);

  const fetchCities = (text) => {
    setcity(text);
    fetch(`https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=${text}&locationType=city&format=json
    `)
      .then((item) => item.json())
      .then((data) => {
        // console.log(data);
        setaddress(data.location.address);
        setcities(data.location.city);
        console.log(address);
      });
  };

  const handlePress = async (cityname) => {
    // setcity(cityname);
    await AsyncStorage.setItem('newcity', cityname);
    navigation.navigate('Home', {city: cityname});
    setcity('');
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header name="Manage Cities" />

        <View style={styles.searchBox}>
          <Icon
            style={{padding: 12, color: '#545454'}}
            name="search-outline"
            size={25}
          />
          <TextInput
            style={{
              fontSize: 21,
              fontFamily: 'sans-serif-thin',
              color: '#545454',
            }}
            placeholder="Enter location"
            value={city}
            onChangeText={(val) => fetchCities(val)}
          />
        </View>

        {address.map((item) => {
          return (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <Card transparent>
                <CardItem>
                  <Body>
                    <Text>{item}</Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 7,
    zIndex: 9,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

//make this component available to the app
export default Search;
