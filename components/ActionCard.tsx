import { StyleSheet, Text, View, Linking, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ActionCard = () => {
  function openLink(url: string) {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  }

  return (
    <View>
      <Text style={styles.title}>Featured Developer</Text>
      <View style={[styles.card, styles.elevatedCard]}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
            }}
            style={styles.cardImage}
          />
          <View style={styles.bodyContent}>
            <Text style={styles.headerText}>React Native Dev</Text>
            <Text style={styles.description}>
              Full-stack developer passionate about creating beautiful mobile experiences with React Native and TypeScript.
            </Text>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.socialTitle}>Connect with me:</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity
              style={[styles.socialButton, styles.githubButton]}
              onPress={() => openLink('https://github.com')}
            >
              <Text style={styles.socialButtonText}>GitHub</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.linkedinButton]}
              onPress={() => openLink('https://linkedin.com')}
            >
              <Text style={styles.socialButtonText}>LinkedIn</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.twitterButton]}
              onPress={() => openLink('https://twitter.com')}
            >
              <Text style={styles.socialButtonText}>Twitter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ActionCard

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
    marginHorizontal: 12,
    marginVertical: 8,
    overflow: 'hidden',
  },
  elevatedCard: {
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  container: {
    padding: 16,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  bodyContent: {
    marginBottom: 12,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  footerContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  socialButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  githubButton: {
    backgroundColor: '#333',
  },
  linkedinButton: {
    backgroundColor: '#0077B5',
  },
  twitterButton: {
    backgroundColor: '#1DA1F2',
  },
})