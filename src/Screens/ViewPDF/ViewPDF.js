import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {useRoute} from '@react-navigation/native';
const ViewPDF = () => {
  const [linkuri, setLinkuri] = useState('');
  const route = useRoute();
  useEffect(() => {
    checkdata();
  }, []);
  const checkdata = () => {
    switch (route?.params?.data) {
      case '1':
        setLinkuri('http://samples.leanpub.com/thereactnativebook-sample.pdf');
        break;
      case '2':
        setLinkuri(
          'https://firebasestorage.googleapis.com/v0/b/cukurgeh-b4973.appspot.com/o/Book%2FPractical%20React%20Native%20Build%20Two%20Full%20Projects%20and%20One%20Full%20Game%20using%20React%20Native%20(Frank%20Zammetti)%20(z-lib.org).pdf?alt=media&token=7adc3a38-0694-41ee-9cc9-7c216a7e0962',
        );
        break;
      case '3':
        setLinkuri(
          'https://firebasestorage.googleapis.com/v0/b/cukurgeh-b4973.appspot.com/o/Book%2FCreating%20Apps%20with%20React%20Native%20Deliver%20Cross-Platform%200%20Crash%2C%205%20Star%20Apps%20(M.%20Holmes%20He)%20(z-lib.org).pdf?alt=media&token=5daf7b8c-ea91-417a-83b8-ce9333598496',
        );
        break;
      case '4':
        setLinkuri(
          'https://firebasestorage.googleapis.com/v0/b/cukurgeh-b4973.appspot.com/o/Book%2FReact%20Projects%20Build%20advanced%20cross-platform%20projects%20with%20React%20and%20React%20Native%20to%20become%20a%20professional%20developer%2C%202nd%20Ed%20(Roy%20Derks)%20(z-lib.org).pdf?alt=media&token=b0f5162e-176b-4d55-a417-3710cdb27597',
        );
        break;
      case '5':
        setLinkuri(
          'https://firebasestorage.googleapis.com/v0/b/cukurgeh-b4973.appspot.com/o/Book%2FReact%20and%20React%20Native%20A%20complete%20hands-on%20guide%20to%20modern%20web%20and%20mobile%20development%20with%20React.js%2C%203rd%20Edition%20(Adam%20Boduch%20Roy%20Derks)%20(z-lib.org).pdf?alt=media&token=6c97baef-8ac2-4bef-b1ac-75edcf76d194',
        );
        break;
      case '6':
        setLinkuri(
          'https://firebasestorage.googleapis.com/v0/b/cukurgeh-b4973.appspot.com/o/Book%2FSelf%20Discipline%20Mindset%20Why%20Self%20Discipline%20Is%20Lacking%20in%20Most%20and%20How%20to%20Unleash%20It%20Now%20(Curtis%20Leone)%20(z-lib.org).pdf?alt=media&token=a2b99903-cd82-4783-9e2c-ee4d921524de',
        );
        break;
    }
  };
  const source = {
    uri: linkuri,
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default ViewPDF;
