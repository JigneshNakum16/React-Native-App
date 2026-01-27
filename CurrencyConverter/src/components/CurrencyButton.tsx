import { StyleSheet, Text, View } from 'react-native';
import type { PropsWithChildren } from 'react';
import React from 'react';

type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

const CurrencyButton = ({ name, flag }: CurrencyButtonProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.flag}>{flag}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default CurrencyButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 22,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
  },
});
