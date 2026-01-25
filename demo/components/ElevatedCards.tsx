import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ElevatedCards = () => {
  return (
     <View>
          <Text style={styles.title}>Elevated Cards</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
          >
            <View style={[styles.card, styles.cardRed]}>
              <Text style={styles.emoji}>❤️</Text>
              <Text style={styles.cardLabel}>Love</Text>
            </View>
            <View style={[styles.card, styles.cardBlue]}>
              <Text style={styles.emoji}>🌊</Text>
              <Text style={styles.cardLabel}>Ocean</Text>
            </View>
            <View style={[styles.card, styles.cardGreen]}>
              <Text style={styles.emoji}>🌿</Text>
              <Text style={styles.cardLabel}>Nature</Text>
            </View>
            <View style={[styles.card, styles.cardPurple]}>
              <Text style={styles.emoji}>🌟</Text>
              <Text style={styles.cardLabel}>Star</Text>
            </View>
            <View style={[styles.card, styles.cardOrange]}>
              <Text style={styles.emoji}>🔥</Text>
              <Text style={styles.cardLabel}>Fire</Text>
            </View>
            <View style={[styles.card, styles.cardPink]}>
              <Text style={styles.emoji}>🌸</Text>
              <Text style={styles.cardLabel}>Flower</Text>
            </View>
          </ScrollView>
        </View>
  )
}

export default ElevatedCards

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    margin: 8,
  },
  container: {
    paddingHorizontal: 8,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    marginHorizontal: 8,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  emoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  cardRed: {
    backgroundColor: '#EF4444',
  },
  cardBlue: {
    backgroundColor: '#3B82F6',
  },
  cardGreen: {
    backgroundColor: '#10B981',
  },
  cardPurple: {
    backgroundColor: '#8B5CF6',
  },
  cardOrange: {
    backgroundColor: '#F97316',
  },
  cardPink: {
    backgroundColor: '#EC4899',
  },
});
