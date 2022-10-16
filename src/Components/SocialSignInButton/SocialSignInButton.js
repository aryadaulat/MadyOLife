import React,{useCallback} from 'react'
import { View, Text,Alert } from 'react-native'
import CustomButton from '../CustomButton'
import {Auth} from "aws-amplify";

const SocialSignInButton = () => {
	const onSignInFacebook = () => {
    // console.warn('Sign In With Facebook');
		Alert.alert('Cooming Soon',"Fitur Akan Segera Tersedia")
  };
  const onSignInGoogle = useCallback(() => {
		// Auth.federatedSignIn({provider: "google"});
	 Alert.alert('Cooming Soon',"Fitur Akan Segera Tersedia")
}, []);
  
	return (
		<>
			 <CustomButton
        text="Sign In With Facebook"
        onPress={onSignInFacebook}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Sign In With Google"
        onPress={onSignInGoogle}
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
      
		</>
	)
}

export default SocialSignInButton
