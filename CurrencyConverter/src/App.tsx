import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { currencyByRupee } from './constants';
import { CurrencyConverter } from './components/CurrencyConverter';
import Snackbar from 'react-native-snackbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Currency } from '.';

const App = () => {
  const [inputValue,  ] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (currency: Currency) => {
    if (!inputValue) {
      Snackbar.show({
        text: 'Please enter some value to convert',
        backgroundColor: '#EA7773',
        textColor: '#FFFFFF',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * currency.value;
      const result = `${currency.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(currency.name);
    }else {
      Snackbar.show({
        text: 'Invalid input value',
        backgroundColor: '#F4BE5C',
        textColor: '#000000',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
  return (
    <SafeAreaView>
      <StatusBar></StatusBar>
      <View>
        <Text>App</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
