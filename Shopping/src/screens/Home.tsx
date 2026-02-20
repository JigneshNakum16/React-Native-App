import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
// React Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

//components
import ProductItem from '../components/ProductItem';
import Separator from '../components/Separator';

//data
import { PRODUCTS_LIST } from '../data/contants';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <FlatList
        data={PRODUCTS_LIST}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('Details', { product: item })}
          >
            <ProductItem product={item} />
          </Pressable>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',

    padding: 12,
    backgroundColor: '#FFFFFF',
  },
});
