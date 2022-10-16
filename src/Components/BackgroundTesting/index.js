import React from 'react'
import { StyleSheet, View,Dimensions } from 'react-native'
import {Canvas, Box, BoxShadow, Fill, rrect, rect,Text,useFont,TextPath,Skia, Group} from "@shopify/react-native-skia";
// import {Realguy} from '../../Assets/Font/Realguy.otf'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const circle = Skia.Path.Make();
circle.addCircle(128, 128, 128);

export default function BackgroundTesting() {
	const font = useFont(require("../../Assets/Font/Realguy.otf"), 40);
  if (font === null) {
    return null;
  }
	return (
		<Canvas style={{ width:width, height: height }}>
    <Fill color="#add8e6" />
		
    <Group>
		<Box box={rrect(rect(width*0.10, height*0.35, width*0.8, height*0.3), 24, 24)} color="#add8e6">
      <BoxShadow dx={10} dy={10} blur={10} color="#93b8c4" inner />
      <BoxShadow dx={-10} dy={-10} blur={10} color="#c7f8ff" inner />
      <BoxShadow dx={10} dy={10} blur={10} color="#93b8c4" />
      <BoxShadow dx={-10} dy={-10} blur={10} color="#c7f8ff" />
    </Box>
		<Text
        x={width*0.30}
        y={height*0.50}
        text="MadyOLife"
        font={font}
				// size={32}
				inner
      />
		</Group>
  </Canvas>
	)
}

const styles = StyleSheet.create({})
