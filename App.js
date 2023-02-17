import React, { useRef, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { 
  SignIn, 
  SignUp
} from './screens/auth';
import {
  Home, 
  // Scan,
  Wellcome
} from './screens';
import { 
  BackHandler, 
  Alert, 
  StatusBar, 
} from 'react-native';
// import Sidebar from './components/navigation/sidebar'

const Stack = createStackNavigator()

const App = () => {
  /** Handling Back Button*/
  const navigationRef = useRef();
  const routeNameRef = useRef();

  const backAction = () => {
    if (routeNameRef.current == 'SignIn' || 
        routeNameRef.current == 'SignUp' || 
        routeNameRef.current == 'Home' ||
        routeNameRef.current == 'Wellcome') {
        Alert.alert("Hold on!", "Are you sure you want to exit app?", [
          {
            text: "Cancel",
            onPress: () => {
              return true;
            },
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    }
  };

  useEffect(  () => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    StatusBar.setTranslucent(false)
    StatusBar.setBackgroundColor('#FF573300'); 
    StatusBar.setBarStyle('dark-content')
    
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);    
  
  return(
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={async () => {
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator 
        screenOptions ={{
          headerShown: false,
          animationEnabled: false
        }}
        initialRouteName = {'Wellcome'}
      >
        <Stack.Screen name = "Wellcome" component={Wellcome} />
        {/* Auth */}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />

        {/* Tabs */}
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
