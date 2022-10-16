import React, {useState, useEffect} from 'react';
import {Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Profile from '../../Assets/Image/profile.png';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { useIsFocused  } from "@react-navigation/core";
import {Auth} from 'aws-amplify';
import {useForm} from 'react-hook-form';

const EditProfile = () => {
	const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [authuser, setAuthuser] = useState('');
	const {
    control,
    handleSubmit,
		setValue,
    formState: {errors},
  } = useForm();
  console.log(errors);
	const onSubmitPressed = async data => {
    try{
			const updateuser = await Auth.currentAuthenticatedUser();
			await Auth.updateUserAttributes(updateuser, {
				'name': data.nickname,
				'nickname' :data.username,
				'preferred_username' :data.tujuanpribadi,
				'profile':data.pekerjaansekarang,
				'website':data.instansi,
				'phone_number':data.nohp,
				'address':data.domisili,
				'zoneinfo' :data.kewarganegaraan,
			});
			navigation.navigate('Home');
		}catch(e){
			console.log(e);
		}
  };
  const checkUser = async () => {
    try {
      await Auth.currentUserInfo().then(response=>{
				setAuthuser(response.attributes)
				setValue(
					"nickname",response.attributes.name
				)
				setValue(					
					"username",response.attributes.nickname
				)
				setValue(					
					"email",response.attributes.email
				)
				setValue(					
					"tujuanpribadi",response.attributes.preferred_username
				)
				setValue(					
					"pekerjaansekarang",response.attributes.profile
				)
				setValue(					
					"instansi",response.attributes.website
				)
				setValue(					
					"nohp",response.attributes.phone_number
				)
				setValue(					
					"domisili",response.attributes.address
				)
				setValue(					
					"kewarganegaraan",response.attributes.zoneinfo
				)
			}
			
			)
			console.log(authuser)
			
    } catch (e) {
      setAuthuser(null);
      console.log(e);
    }
  };
  useEffect(() => {
		if (isFocused) {
			console.log('masuk isfocuses')
			checkUser();   
		}else{
			console.log('gagal masuk isfocuses')	
		}
		
    
  }, []);
	const check =()=>{
		console.log(authuser.name)
		let username=authuser.name.toString()
		console.log(username)
		setValue(
					"nickname",username
				)
	}
	const updateUser= async ()=>{
		try{
			const updateuser = await Auth.currentAuthenticatedUser();
			await Auth.updateUserAttributes(updateuser, {
				'name': nama,
				'preferred_username' :tujuanpribadi,
				'profile':pekerjaan,
				'website':namainstansi,
				'phone_number':nohandphone,
				'address':domisili,
				'zoneinfo' :kewarganegaraan
			});
			console.log('berhasil')
		}catch(e){
			console.log(e);
		}
	}
  return (
    <ScrollView>
			<SafeAreaView style={styles.page}>
      <SafeAreaView style={styles.header}>
        <Image
          source={Profile}
          style={{height: 100, width: 100, alignSelf: 'center'}}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.middle}>
        <SafeAreaView>
          <Text style={{padding:10,color:'black'}}>Nama</Text>
					<CustomInput
          name="nickname"
          placeholder="Name"
          control={control}
          
        />
        </SafeAreaView>
				<SafeAreaView>
          <Text style={{padding:10,color:'black'}}>Email</Text>
					<Text style={{padding:15,backgroundColor:'white',color:'black',fontWeight:'400'}}>{authuser.email}</Text>
        </SafeAreaView>
				<SafeAreaView>
          <Text style={{padding:10,color:'black'}}>Username</Text>
					<Text style={{padding:15,backgroundColor:'white',color:'black',fontWeight:'400'}}>{authuser.nickname}</Text>
        </SafeAreaView>
				<SafeAreaView>
          <Text style={{padding:10,color:'black'}}>Tujuan Pribadi</Text>
					<CustomInput
          name="tujuanpribadi"
          placeholder="Tujuan Pribadi"
          control={control}
          rules={{required: 'Tujuan Pribadi Is Required'}}
        />
        </SafeAreaView>
				<SafeAreaView>
          <Text style={{padding:10,color:'black'}}>Pekerjaan Sekarang</Text>
					<CustomInput
          name="pekerjaansekarang"
          placeholder="Pekerjaan Sekarang"
          control={control}
          rules={{required: 'Pekerjaan Sekarang Is Required'}}
        />
        </SafeAreaView>
				<SafeAreaView>
          <Text style={{padding:10,color:'black'}}>Nama Instansi</Text>
					<CustomInput
          name="instansi"
          placeholder="Nama Instansi"
          control={control}
          rules={{required: 'Nama Instansi Is Required'}}
        />
        </SafeAreaView>
				<SafeAreaView>
          <Text style={{padding:10,color:'black'}}>No.Handphone</Text>
					<CustomInput
          name="nohp"
          placeholder="Nomor Handphone"
          control={control}
          rules={{required: 'Nomor Handphone Is Required'}}
        />
        </SafeAreaView>
				<SafeAreaView>
          <Text style={{padding:10,color:'black'}}>Domisili</Text>
					<CustomInput
          name="domisili"
          placeholder="Domisili"
          control={control}
          rules={{required: 'Domisili Is Required'}}
        />
        </SafeAreaView>
				<SafeAreaView>
          <Text style={{padding:10,color:'black'}}>Kewarganegaraan</Text>
					<CustomInput
          name="kewarganegaraan"
          placeholder="Kewarganegaraan"
          control={control}
          rules={{required: 'Kewarganegaraan Is Required'}}
        />
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.Footer}>
			<CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
			</SafeAreaView>
    </SafeAreaView>
		</ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
	page:{
		flex: 1,
		backgroundColor:'white'
	}
});
