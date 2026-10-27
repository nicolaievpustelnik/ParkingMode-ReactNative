import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import Logo from '../../components/login/Logo';
import { auth } from '../../../database/firebase';

export default function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const signIn = async () => {
    if (email.trim() == '' || password == '') {
      alert('Enter your email and password');
      return;
    }

    setLoader(true);
    try {
      await auth.signInWithEmailAndPassword(email.trim(), password);
      props.root.navigate('Maps');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={styles.blockLogin}>
      <Logo />
      <ActivityIndicator size="large" color="#006ea8" animating={loader} />
      <TextInput style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Email' placeholderTextColor='#000000' autoCapitalize='none' keyboardType='email-address' onChangeText={setEmail} />
      <TextInput style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Password' secureTextEntry={true} placeholderTextColor='#000000' onChangeText={setPassword} />
      <TouchableOpacity style={styles.buttonLogin} onPress={signIn}>
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