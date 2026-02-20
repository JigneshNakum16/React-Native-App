import { StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'

interface SeparatorProps {
  style?: ViewStyle
}

const Separator = ({ style }: SeparatorProps) => {
  return (
    <View style={[styles.separator, style]} />
  )
}

export default Separator

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 8,
    }
})
