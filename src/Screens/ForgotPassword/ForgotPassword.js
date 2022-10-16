import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, useWindowDimensions, ScrollView,Alert} from 'react-native';
import Logo from '../../Assets/Image/madyolife.png';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import SocialSignInButton from '../../Components/SocialSignInButton'
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify'

const ForgotPassword = () => {
	const navigation = useNavigation();

  const onSendPresed = async data => {
		const username=data.username;
		try {
			await Auth.forgotPassword(data.username);
			navigation.navigate('ResetPassword',{username})
			// Alert.alert(
			// 	"Succes","Code Was Resend to Your Email")
			}catch(e){
				Alert.alert(
					"Oops",e.message)
			}
		// navigation.navigate('ResetPassword')
  };
	const onSignInPress = () => {
		navigation.navigate('SignIn')
  };
	const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  return (
		<ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style={styles.title}>Reset Your Password</Text>
      <CustomInput
					title="Username"
          name="username"
          placeholder="Masukkan Username"
          control={control}
          rules={{required: 'Username Is Required'}}
        />

      <CustomButton text="Send" onPress={handleSubmit(onSendPresed)} />

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

export default ForgotPassword;
