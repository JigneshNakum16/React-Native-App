import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTypeParamList } from '../../App';

type HomeProps = NativeStackScreenProps<RootTypeParamList, 'Home'>;

const Home = (props: HomeProps) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Go to Details"
        // onPress={() => props.navigation.navigate('Details', { productId: '12345' })}
        // onPress={() => props.navigation.navigate('Details')}
        onPress={() => props.navigation.push('Details', { productId: '20' })}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
