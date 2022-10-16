import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Logo from '../../Assets/Image/madyolife.png';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import SocialSignInButton from '../../Components/SocialSignInButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const SignIn = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoadingScreen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }
		setLoadingScreen(true);
    try {
      await Auth.signIn(data.username, data.password);			
			navigation.navigate('Home');
      
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setLoadingScreen(false);
    
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };
  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
					title="Username"
          name="username"
          placeholder="Masukkan Username"
          control={control}
          rules={{required: 'Username Is Required'}}
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

        <CustomButton
          text={loading ? 'Loading ...' : 'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
        />
        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButton />
        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
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
});

export default SignIn;
