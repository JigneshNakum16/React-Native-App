import { StyleSheet, View } from 'react-native'
import React from 'react'

const Separator = () => {
  return (
    <View style={styles.separator} />
  )
}

export default Separator

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#CED0CE',
        marginLeft: 10,
        marginRight: 10,
    }
})