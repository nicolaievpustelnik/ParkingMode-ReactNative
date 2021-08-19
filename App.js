import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login1 from './src/pages/login/Login';
import Signup1 from './src/pages/signup/Signup';
import Maps1 from './src/pages/maps/Maps';
import Registerparking1 from './src/pages/admin/register/Registerparking';

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

function Registerparking({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#006ea8' barStyle="light-content" />
      <Registerparking1 root={navigation} />
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
      <Stack.Screen name="Create Parking" component={Registerparking} />
      <Stack.Screen name="Maps" component={Maps} />

    </Stack.Navigator>
  );
}

/*
Example 
-34.57300397055752
-58.44541425296715
*/

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

// import * as React from 'react';
// import { View, StyleSheet, TextInput } from 'react-native';
// import Constants from 'expo-constants';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const GOOGLE_PLACES_API_KEY = ''; // never save your real api key in a snack!

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <GooglePlacesAutocomplete
//         placeholder="Search"
//         query={{
//           key: GOOGLE_PLACES_API_KEY,
//           language: 'en', // language of the results
//         }}
//         onPress={(data, details = null) => console.log(data)}
//         onFail={(error) => console.error(error)}
//         requestUrl={{
//           url:
//             'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
//           useOnPlatform: 'web',
//         }} // this in only required for use on the web. See https://git.io/JflFv more for details.
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     paddingTop: Constants.statusBarHeight + 10,
//     backgroundColor: '#ecf0f1',
//   },
// });

// export default App;