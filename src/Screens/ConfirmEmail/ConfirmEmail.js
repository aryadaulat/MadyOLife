import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, Alert} from 'react-native';
import Logo from '../../Assets/Image/madyolife.png';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import SocialSignInButton from '../../Components/SocialSignInButton'
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native'
import {Auth} from 'aws-amplify';

const ConfirmEmail = () => {
  const route = useRoute()
	const navigation = useNavigation();
	const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
		defaultValues: {username: route?.params?.username}
	});
	const username = watch('username')
  const onConfirmPresed = async data => {

		try {
		await Auth.confirmSignUp(data.username, data.code);
		navigation.navigate('SignIn')
		}catch(e){
			Alert.alert(
				"Oops",e.message)
		}
    // navigation.navigate('Home')
  };
	const onSignInPress = () => {
		navigation.navigate('SignIn')
  };
	const onResendCode = async () => {
    try {
			await Auth.resendSignUp(username);
			Alert.alert(
				"Succes","Code Was Resend to Your Email")
			}catch(e){
				Alert.alert(
					"Oops",e.message)
			}
  };
	
;
  // const pwd = watch('password');

  return (
		<ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style={styles.title}>Confirm Your Email</Text>
      
			<CustomInput
          name="username"
          placeholder="Masukkan Username"
          control={control}
          rules={{required: 'Username Is Required'}}
        />

			<CustomInput
          name="code"
          placeholder="Masukkan Kode Email Verifikasi"
          control={control}
          rules={{required: 'Verikasi Kode Email Is Required'}}
        />
      <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPresed)} />
			<CustomButton
        text="Resend Code"
        onPress={onResendCode}
        type="SECONDARY"
      />

			<CustomButton
        text="Back To Sign In"
        onPress={onSignInPress}
        type="TERTIARY"
      />
    </View>
		</ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
	text: {
		color:'gray',
		marginVertical:10,
	},
	link: {
		color: '#FDB075'
	}
});

export default ConfirmEmail;
