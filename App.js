/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';


import Navigation from './src/Navigation'
import  Amplify,{Auth}  from 'aws-amplify'
// import {withAuthenticator,AmplifyTheme} from 'aws-amplify-react-native'
import config from './src/aws-exports'

Amplify.configure(config)

const App = () => {
	// Auth.signOut();
  return (
    <SafeAreaView style={styles.root}>
			<Navigation />
		</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root:{
		flex: 1,
		backgroundColor:'#F9FBFC'
	}
});

// const signUpConfig = {
//   header: "My Customized Sign Up",
//   hideAllDefaults: true,
//   signUpFields: [
//     {
//       label: "Full name",
//       key: "name",
//       required: true,
//       displayOrder: 1,
//       type: "string",
//     },
//     {
//       label: "Email",
//       key: "email",
//       required: true,
//       displayOrder: 2,
//       type: "string",
//     },
//     {
//       label: "Username",
//       key: "preferred_username",
//       required: true,
//       displayOrder: 3,
//       type: "string",
//     },
//     {
//       label: "Password",
//       key: "password",
//       required: true,
//       displayOrder: 4,
//       type: "password",
//     },
//   ],
// };

// const customTheme = {...AmplifyTheme,
	//lihat dari link ini https://github.com/aws-amplify/amplify-js/blob/main/packages/aws-amplify-react-native/src/AmplifyTheme.ts
// button:{
// 	...AmplifyTheme.button,
// 	backgroundColor:'blue',
// 	borderRadius:10,
// }
// }

// export default withAuthenticator(App,{signUpConfig,theme : customTheme});
export default App;
