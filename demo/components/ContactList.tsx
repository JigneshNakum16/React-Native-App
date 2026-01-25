import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ContactList = () => {
  const contacts = [
    {
      id: 1,
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      email: 'rahul.sharma@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      role: 'Software Engineer',
    },
    {
      id: 2,
      name: 'Priya Patel',
      phone: '+91 98123 45678',
      email: 'priya.patel@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      role: 'Product Manager',
    },
    {
      id: 3,
      name: 'Amit Kumar',
      phone: '+91 97654 32109',
      email: 'amit.kumar@email.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      role: 'UX Designer',
    },
    {
      id: 4,
      name: 'Sneha Singh',
      phone: '+91 99876 54321',
      email: 'sneha.singh@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      role: 'Marketing Lead',
    },
    {
      id: 5,
      name: 'Vikram Joshi',
      phone: '+91 96543 21098',
      email: 'vikram.joshi@email.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      role: 'Data Analyst',
    },
  ];

  return (
    <View>
      <Text style={styles.title}>My Contacts</Text>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {contacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <Image
              source={{ uri: contact.avatar }}
              style={styles.avatar}
            />
            <View style={styles.contactInfo}>
              <Text style={styles.name}>{contact.name}</Text>
              <Text style={styles.role}>{contact.role}</Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>📞 {contact.phone}</Text>
                <Text style={styles.detailText}>✉️ {contact.email}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default ContactList

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  scrollContainer: {
    paddingHorizontal: 12,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detailsContainer: {
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#555',
  },
})