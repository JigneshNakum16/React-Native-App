// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageSourcePropType,
//   Image,
//   Pressable,
// } from 'react-native';
// import React, { useState } from 'react';
// import type { PropsWithChildren } from 'react';

// import DiceOne from '../assets/One.png';
// import DiceTwo from '../assets/Two.png';
// import DiceThree from '../assets/Three.png';
// import DiceFour from '../assets/Four.png';
// import DiceFive from '../assets/Five.png';
// import DiceSix from '../assets/Six.png';

// type DiceProps = PropsWithChildren<{
//   imageUrl: ImageSourcePropType;
// }>;

// const Dice = ({ imageUrl }: DiceProps): JSX.Element => {
//   return (
//     <View>
//       <Image style={styles.diceImage} source={imageUrl} />
//     </View>
//   );
// };

// function App() {
//   const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne);

//   const rollDiceonTop = () => {
//     const randomNumber = Math.floor(Math.random() * 6) + 1;
//     switch (randomNumber) {
//       case 1:
//         setDiceImage(DiceOne);
//         break;
//       case 2:
//         setDiceImage(DiceTwo);
//         break;
//       case 3:
//         setDiceImage(DiceThree);
//         break;
//       case 4:
//         setDiceImage(DiceFour);
//         break;
//       case 5:
//         setDiceImage(DiceFive);
//         break;
//       case 6:
//         setDiceImage(DiceSix);
//         break;
//       default:
//         setDiceImage(DiceOne);
//         break;
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Dice imageUrl={diceImage} />
//       <Pressable onPress={rollDiceonTop}>
//         <Text style={styles.rollDiceBtnText}>Roll the Dice</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFF2F2',
//   },
//   diceContainer: {
//     margin: 12,
//   },
//   diceImage: {
//     width: 200,
//     height: 200,
//     // resizeMode: 'contain',
//   },
//   rollDiceBtnText: {
//     paddingVertical: 10,
//     paddingHorizontal: 40,
//     borderWidth: 2,
//     borderRadius: 8,
//     borderColor: '#E5E0FF',
//     fontSize: 16,
//     color: '#8EA7E9',
//     fontWeight: '700',
//     textTransform: 'uppercase',
//   },
// });

// export default App;

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Animated,
  Easing,
  ImageSourcePropType,
} from 'react-native';

// Dice Images
const diceImages: ImageSourcePropType[] = [
  require('../assets/One.png'),
  require('../assets/Two.png'),
  require('../assets/Three.png'),
  require('../assets/Four.png'),
  require('../assets/Five.png'),
  require('../assets/Six.png'),
];

const Dice = ({
  imageUrl,
  rotateAnim,
}: {
  imageUrl: ImageSourcePropType;
  rotateAnim: Animated.Value;
}) => {
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Image
      source={imageUrl}
      style={[styles.diceImage, { transform: [{ rotate }] }]}
    />
  );
};

export default function App() {
  const [diceImage, setDiceImage] = useState(diceImages[0]);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rollDice = () => {
    rotateAnim.setValue(0);

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    const randomIndex = Math.floor(Math.random() * 6);
    setDiceImage(diceImages[randomIndex]);
  };

  return (
    <View style={styles.container}>
      <Dice imageUrl={diceImage} rotateAnim={rotateAnim} />

      <Pressable
        onPress={rollDice}
        android_ripple={{ color: '#E5E0FF' }}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Roll Dice</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diceImage: {
    width: 180,
    height: 180,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    backgroundColor: '#8EA7E9',
    elevation: 6,
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
