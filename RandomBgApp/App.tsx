import React, { useState, useCallback } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

const getRandomColor = () =>
  '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const [shapeColors, setShapeColors] = useState({
    square: '#000000',
    circle: '#000000',
    triangle: '#000000',
    rectangle: '#000000',
    pill: '#000000',
  });

  const changeBackgroundAndShapes = useCallback(() => {
    setBackgroundColor(getRandomColor());

    setShapeColors({
      square: getRandomColor(),
      circle: getRandomColor(),
      triangle: getRandomColor(),
      rectangle: getRandomColor(),
      pill: getRandomColor(),
    });
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />

      {/* 🔒 DO NOT CHANGE THIS */}
      <View style={[styles.container, { backgroundColor }]}>
        {/* Shapes */}
        <View style={[styles.square, { backgroundColor: shapeColors.square }]} />
        <View style={[styles.circle, { backgroundColor: shapeColors.circle }]} />
        <View
          style={[
            styles.triangle,
            { borderBottomColor: shapeColors.triangle },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            { backgroundColor: shapeColors.rectangle },
          ]}
        />
        <View style={[styles.pill, { backgroundColor: shapeColors.pill }]} />

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={changeBackgroundAndShapes}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Change Background</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  square: {
    width: 80,
    height: 80,
  },

  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  rectangle: {
    width: 140,
    height: 60,
  },

  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 70,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  pill: {
    width: 140,
    height: 50,
    borderRadius: 25,
  },

  button: {
    marginTop: 30,
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
