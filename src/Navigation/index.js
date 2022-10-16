import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import ConfirmEmail from '../Screens/ConfirmEmail';
import ForgotPassword from '../Screens/ForgotPassword';
import ResetPassword from '../Screens/ResetPassword';
import Splash from '../Screens/Splash';
import Home from '../Screens/Home';
import ViewPDF from '../Screens/ViewPDF';
import EditProfile from '../Screens/EditProfile';
import Amplify, {Auth, Hub} from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [user, setUser] = useState(undefined);
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
						<Stack.Screen name="ViewPDF" component={ViewPDF} />
						<Stack.Screen name="SignIn" component={SignIn} />
						<Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
