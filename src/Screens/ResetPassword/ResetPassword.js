import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../Assets/Image/madyolife.png';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import SocialSignInButton from '../../Components/SocialSignInButton'
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native'
import {Auth} from 'aws-amplify';

const ResetPassword = () => {
	const route = useRoute()
	const navigation = useNavigation();

  const onSubmitPressed = async data => {
    try {
			await Auth.forgotPasswordSubmit(data.username, data.code,data.password);
			navigation.navigate('SignIn')
			}catch(e){
				Alert.alert(
					"Oops",e.message)
			}
  };
	const onSignInPress = () => {
    navigation.navigate('SignIn')
  };
	const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
		defaultValues: {username: route?.params?.username}
	});
	const pwd = watch('password');
  return (
		<ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style={styles.title}>Reset Your Password</Text>
			<CustomInput
          name="username"
          placeholder="Masukkan Username"
          control={control}
          rules={{required: 'Username Is Required'}}
        />
			<CustomInput
          name="code"
          placeholder="Masukkan Kode"
          control={control}
          rules={{required: 'Kode Is Required'}}
        />

			<CustomInput
          name="password"
          placeholder="Masukkan Password Baru"
          control={control}
          rules={{
            required: 'Password Is Required',
            minLength: {value: 3, message: 'Password terlalu Pendek'},
          }}
          secureTextEntry
        />
				<CustomInput
          name="passwordRepeat"
          placeholder="Masukkan Ulang Password"
          control={control}
          rules={{
            validate: value => value === pwd || 'Password Tidak Sama',
          }}
          secureTextEntry
        />
      <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

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

export default ResetPassword;
