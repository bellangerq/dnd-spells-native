import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function History({ spells, onFetchHistory, navigation }) {
  const handlePress = (index) => {
    navigation.navigate('Spell')
    onFetchHistory(index)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>History</Text>
      {spells.map((spell, i) => {
        return (
          <Text key={`${spell.index}-${i}`}>
            • <Text>{spell.name}</Text>
            <TouchableOpacity onPress={() => handlePress(spell.index)}>
              <Text>Fetch this spell</Text>
            </TouchableOpacity>
          </Text>
        )
      })}
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
