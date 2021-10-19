import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'

import Spell from './components/Spell'

export default function App() {
  const [spellIndexes, setSpellIndexes] = useState([])

  useEffect(() => {
    const url = 'https://www.dnd5eapi.co/api/spells'

    fetch(url)
      .then((res) => res.json())
      .then((spells) => {
        const indexes = spells.results.map((spell) => spell.index)
        setSpellIndexes(indexes)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <Spell spellIndexes={spellIndexes} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
})
