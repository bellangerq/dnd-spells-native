import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default function History({ spells }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>History</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24
  }
})
