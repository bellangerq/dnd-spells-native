import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  ActivityIndicator,
  Button,
  Text,
  ScrollView,
  View
} from 'react-native'

import themeColor from './utils/themeColor'
import Spell from './components/Spell'

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [spellIndexes, setSpellIndexes] = useState([])
  const [spell, setSpell] = useState(null)

  const handlePress = () => {
    const randomIndex =
      spellIndexes[Math.floor(Math.random() * spellIndexes.length)]

    const url = `https://www.dnd5eapi.co/api/spells/${randomIndex}`
    setIsLoading(true)

    fetch(url)
      .then((res) => res.json())
      .then((spell) => {
        setSpell(spell)
        setIsLoading(false)
      })
  }

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
        <Text style={styles.heading}>
          Discover a random D&D fifth edition spell...
        </Text>

        <Button
          disabled={isLoading}
          title="Get a random spell"
          onPress={handlePress}
          color={themeColor}
        />

        <View style={styles.resultWrapper}>
          {isLoading ? (
            <ActivityIndicator color={themeColor} size="large" />
          ) : (
            spell && <Spell {...spell} />
          )}
        </View>
      </View>
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
  },
  resultWrapper: {
    marginTop: 24
  }
})
