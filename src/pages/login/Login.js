import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

import Logo from '../../components/login/Logo';

export default function Login(props) {
  return (
    <View style={styles.blockLogin}>
      <Logo />
      <TextInput style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Email' placeholderTextColor='#000000' />
      <TextInput style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Password' secureTextEntry={true} placeholderTextColor='#000000' />
      <TouchableOpacity style={styles.buttonLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signUpTextLogin}>
        <Text style={styles.signUpText}>Don't have an account yet?</Text>
        <Text style={styles.signUpButton} onPress={() => props.root.navigate('Signup')}>Signup</Text>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  blockLogin: {
    flex: 1,
    alignItems: 'center',
  },
  textLogo: {
    color: 'black',
  },
  inputLogin: {
    width: 300,
    height: 50,
    backgroundColor: '#fcffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    marginVertical: 10,
  },
  buttonLogin: {
    width: 300,
    backgroundColor: '#006ea8',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  signUpTextLogin: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signUpText: {
    color: 'white',
    fontSize: 16,
  },
  signUpButton: {
    color: '#006ea8',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 3,
  }

});