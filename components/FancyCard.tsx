import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FancyCard = () => {
  return (
    <View>
      <Text style={styles.title}>Trending Places</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.card}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
            }}
            style={styles.image}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Hawa Mahal</Text>
            <Text style={styles.location}>📍 Jaipur, India</Text>
            <Text style={styles.cardDescription}>
              The iconic Palace of Winds, a stunning example of Rajputana architecture.
            </Text>
            <View style={styles.footer}>
              <Text style={styles.rating}>⭐ 4.8</Text>
              <Text style={styles.footerLink}>Read More →</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1548013146-72479768bada',
            }}
            style={styles.image}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Taj Mahal</Text>
            <Text style={styles.location}>📍 Agra, India</Text>
            <Text style={styles.cardDescription}>
              A timeless symbol of love and one of the Seven Wonders of the World.
            </Text>
            <View style={styles.footer}>
              <Text style={styles.rating}>⭐ 4.9</Text>
              <Text style={styles.footerLink}>Read More →</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1595981234058-8f00b6a5fc42',
            }}
            style={styles.image}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Golden Temple</Text>
            <Text style={styles.location}>📍 Amritsar, India</Text>
            <Text style={styles.cardDescription}>
              A spiritual haven covered in gold, reflecting peace and serenity.
            </Text>
            <View style={styles.footer}>
              <Text style={styles.rating}>⭐ 4.9</Text>
              <Text style={styles.footerLink}>Read More →</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FancyCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
    marginVertical: 8,
    width: 320,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  footerLink: {
    fontSize: 15,
    color: '#3B82F6',
    fontWeight: '600',
  },
});
