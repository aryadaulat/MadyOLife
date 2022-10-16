import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  useWindowDimensions,
  Pressable,
  Alert,
} from 'react-native';
import {Auth} from 'aws-amplify';
import Logo from '../../Assets/Image/madyolife.png';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const {height} = useWindowDimensions();
  const [authuser, setAuthuser] = useState(null);
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentUserInfo();
      setAuthuser(authUser.attributes.name);
    } catch (e) {
      setAuthuser(null);
      navigation.replace('SignIn');
    }
  };
  const signOut = () => {
    Auth.signOut();
		navigation.navigate('SignIn');
  };

  useEffect(() => {
    checkUser();
  }, []);
  const GoDetail = data => {
    switch (data){
			case '1':
				navigation.navigate('ViewPDF',{data});
				break;
			case '2':
				navigation.navigate('ViewPDF',{data});
				break;
			case '3':
				navigation.navigate('ViewPDF',{data});
				break;
			case '4':
				navigation.navigate('ViewPDF',{data});
				break;
			case '5':
				navigation.navigate('ViewPDF',{data});
				break;
			case '6':
				navigation.navigate('ViewPDF',{data});
				break;
		}
  };
  const MiniBootcamp = () => {
    Alert.alert('Coming Soon', 'You Can Register Mini Bootcamp In Here Later');
  };
  const EditProfile = () => {
    navigation.navigate('EditProfile');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <SafeAreaView style={{marginHorizontal: 10}}>
        <SafeAreaView>
          <Image
            source={Logo}
            style={[styles.logo, {height: height * 0.3}]}
            resizeMode="contain"
          />
          <Text style={{fontSize: 20, color: 'black'}}>Hello , </Text>
          <Text style={{fontSize: 35, color: 'black', fontWeight: 'bold'}}>
            {authuser}
          </Text>
          <Text style={{fontSize: 18, color: 'black', marginVertical: 10}}>
            MadyOLife Reading Book
          </Text>
          <SafeAreaView style={{flexDirection: 'row'}}>
            <View style={styles.service}>
              <CustomButton text="SignOut" onPress={()=>signOut()} />
            </View>
          </SafeAreaView>
          <SafeAreaView>
            <Text style={{fontSize: 18, color: 'black', marginVertical: 10}}>
              Book List
            </Text>
            <Pressable onPress={()=>GoDetail('1')} style={styles.activity}>
              <Text style={styles.text}>
                The React Native Book Truong Hoang Dung
              </Text>
            </Pressable>
            <Pressable onPress={()=>GoDetail('2')} style={styles.activity}>
              <Text style={styles.text}>
                Practical React Native Build Two Full Project And One Full Game
                Using React Native
              </Text>
            </Pressable>
            <Pressable onPress={()=>GoDetail('3')} style={styles.activity}>
              <Text style={styles.text}>
                Creating Apps With React Native Deliver Cross-Platform 0 Crash,
                5 Star Apps (M. Holmes He)
              </Text>
            </Pressable>
            <Pressable onPress={()=>GoDetail('4')} style={styles.activity}>
              <Text style={styles.text}>
                React Projects Build Advance Cross-Platform Projects With React
                and React Native to Became A professional developer, 2nd Ed (Roy
                Derks)
              </Text>
            </Pressable>
            <Pressable onPress={()=>GoDetail('5')} style={styles.activity}>
              <Text style={styles.text}>
                React and React Native A complete hand-on guide to modern web
                and mobile development with Reat js, 3rd Edition (Adam Boduch
                Roy Derks)
              </Text>
            </Pressable>
            <Pressable onPress={()=>GoDetail('6')} style={styles.activity}>
              <Text style={styles.text}>
                Self Discipline Mindset Why Self Discipline Is lacking in Most
                and How to Unleash it Now (Curtis Leone)
              </Text>
            </Pressable>
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    alignSelf: 'center',
  },
  service: {
    width: '30%',
    marginHorizontal: 5,
  },
  activity: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#3B71F3',
    marginVertical: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
export default Home;
