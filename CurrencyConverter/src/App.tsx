import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { currencyByRupee } from './constants';
import CurrencyButton from './components/CurrencyButton';
import { Currency } from '.';

const App = () => {
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null,
  );

  useEffect(() => {
    setResult(null);
    setSelectedCurrency(null);
  }, [amount]);

  const showSnackbar = (text: string, bgColor = '#EA7773') => {
    Snackbar.show({
      text,
      backgroundColor: bgColor,
      textColor: '#FFFFFF',
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  const handleConvert = useCallback(
    (currency: Currency) => {
      if (!amount) {
        showSnackbar('Please enter amount');
        return;
      }

      const numericAmount = Number(amount);
      if (isNaN(numericAmount)) {
        showSnackbar('Invalid amount', '#F4BE5C');
        return;
      }

      const converted = numericAmount * currency.value;
      setResult(converted);
      setSelectedCurrency(currency);
    },
    [amount],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e1e" />

      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Currency Converter</Text>

        {/* Input Card */}
        <View style={styles.card}>
          <Text style={styles.label}>Amount in INR</Text>

          <View style={styles.inputRow}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="Enter amount"
              placeholderTextColor="#999"
            />
          </View>

          {result !== null && selectedCurrency && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>
                {selectedCurrency.symbol}{' '}
                {selectedCurrency.name === 'BITCOIN'
                  ? result.toFixed(8)
                  : result.toFixed(2)}
              </Text>
            </View>
          )}
        </View>

        {/* Currency Grid */}
        <FlatList
          data={currencyByRupee}
          numColumns={3}
          keyExtractor={item => item.name}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.currencyButton,
                selectedCurrency?.name === item.name && styles.activeButton,
              ]}
              onPress={() => handleConvert(item)}
            >
              <CurrencyButton {...item} />
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#2c2c2c',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    color: '#AAAAAA',
    marginBottom: 8,
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupee: {
    fontSize: 22,
    color: '#FFFFFF',
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  resultBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ffeaa7',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  currencyButton: {
    flex: 1,
    height: 64,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  activeButton: {
    backgroundColor: '#ffeaa7',
  },
});
