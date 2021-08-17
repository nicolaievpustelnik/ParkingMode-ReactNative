import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.blockLogo}>
      <Image style={styles.imgLogo} source={require('../../../assets/img/logo5.png')} />
      <Text style={styles.textLogo}>Welcome to Parking Mode.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  blockLogo: {
    //flex: 1,
    alignItems: 'center',
    marginBottom: 5,
    paddingTop: 50,
  },
  textLogo: {
    color: 'white',
    alignItems: 'center',
  },
  imgLogo: {
    width: 250,
    height: 300,
  },
});