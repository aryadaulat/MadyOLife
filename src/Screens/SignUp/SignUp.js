import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
	Alert,
} from 'react-native';
import Logo from '../../Assets/Image/madyolife.png';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import SocialSignInButton from '../../Components/SocialSignInButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUp = () => {
  const navigation = useNavigation();

  const onRegister = async data => {
		const {username,password,email,name} =data;
		try {
			await Auth.signUp({
				username,
				password,
				attributes:{
					email,
					name,
					nickname: username,
					preferred_username:'',
					profile:'',
					website:'',
					phone_number:'',
					address:'',
					zoneinfo:''
				}
			});
			navigation.navigate('ConfirmEmail',{username});
		}catch(e){
			Alert.alert('Oops',e.message);
		}
    // navigation.navigate('ConfirmEmail');
  };
  const onTermOfUsePressed = () => {
    console.warn('Term Of Use ');
  };
  const onPrivayPolicyPressed = () => {
    console.warn('Privay Policy Pressed');
  };
  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const pwd = watch('password');
  console.log(errors);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create An Account</Text>
				<CustomInput
					title="Nama"
          name="name"
          placeholder="Masukkan Name"
          control={control}
          rules={{required: 'Name Is Required',
					minLength:{
						value:3,
						message:'Name Terlalu Pendek'
					},
					maxLength:{
						value:24,
						message:'Name Kepanjangan'
					}
				}}
        />
        <CustomInput
					title="Username"
          name="username"
          placeholder="Masukkan Username"
          control={control}
          rules={{required: 'Username Is Required',
					minLength:{
						value:3,
						message:'Username Terlalu Pendek'
					},
					maxLength:{
						value:24,
						message:'Username Kepanjangan'
					}
				}}
        />
        <CustomInput
					title="Email"
          name="email"
          placeholder="Masukkan Email"
          control={control}
          rules={{
            required: 'Username Is Required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
        <CustomInput
					title="Password"
          name="password"
          placeholder="Masukkan Password"
          control={control}
          rules={{
            required: 'Password Is Required',
            minLength: {value: 3, message: 'Password terlalu Pendek'},
          }}
          secureTextEntry
        />
        <CustomInput
					title="Password Repeat"
          name="passwordRepeat"
          placeholder="Masukkan Ulang Password"
          control={control}
          rules={{
            validate: value => value === pwd || 'Password Tidak Sama',
          }}
          secureTextEntry
        />
        <CustomButton text="Register" onPress={handleSubmit(onRegister)} />
        <Text style={styles.text}>
          By Register, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermOfUsePressed}>
            Terms Of Use{' '}
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivayPolicyPressed}>
            Privacy Policy{' '}
          </Text>
        </Text>
        <SocialSignInButton />
        <CustomButton
          text="Have an Account? Sign In"
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
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUp;
