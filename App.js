import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login1 from './src/pages/login/Login';
import Signup1 from './src/pages/signup/Signup';
import Maps1 from './src/pages/maps/Maps';
import Registerparking1 from './src/pages/admin/register/Registerparking';
import Registerparkingmaps1 from './src/pages/admin/register/Registerparkingmaps';

function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#006ea8' barStyle="light-content" />
      <Login1 root={navigation} />
    </View>
  );
}

function Signup({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#006ea8' barStyle="light-content" />
      <Signup1 root={navigation} />
    </View>
  );
}

function Maps({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#006ea8' barStyle="light-content" />
      <Maps1 root={navigation} />
    </View>
  );
}

function Registerparking({ route, navigation }) {

  const { latitude, longitude } = route.params.coordinate;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#006ea8' barStyle="light-content" />
      <Registerparking1 root={navigation} latitude={latitude} longitude={longitude} />
    </View>
  );
}

function Registerparkingmaps({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#006ea8' barStyle="light-content" />
      <Registerparkingmaps1 root={navigation} />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Test" component={Test} /> */}
      {/* <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} /> */}
      {/* <Stack.Screen name="Select Parking" component={Registerparkingmaps} />
      <Stack.Screen name="Create Parking" component={Registerparking} /> */}

      <Stack.Screen name="Maps" component={Maps} />

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
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

