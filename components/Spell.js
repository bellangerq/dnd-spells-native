import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import themeColor from '../utils/themeColor'

function pluralize(number) {
  switch (number) {
    case 1:
      return `${number}st`
    case 2:
      return `${number}nd`
    case 1:
      return `${number}rd`
    default:
      return `${number}th`
  }
}

function SpellDetails({
  name,
  school,
  level,
  casting_time,
  range,
  duration,
  components,
  material,
  desc
}) {
  const spellLevel =
    level === 0
      ? `${school.name} cantrip`
      : `${pluralize(level)}-level` + ' ' + school.name.toLowerCase()

  return (
    <View style={styles.details}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.level}>{spellLevel}</Text>
      <View style={styles.data}>
        <View>
          <Text>
            • <Text style={styles.dataKey}>Casting time</Text>: {casting_time}
          </Text>
        </View>
        <View>
          <Text>
            • <Text style={styles.dataKey}>Range</Text>: {range}
          </Text>
        </View>
        <View>
          <Text>
            • <Text style={styles.dataKey}>Components</Text>:{' '}
            {components.join(', ') + (material ? ` (${material})` : '')}
          </Text>
        </View>
        <View>
          <Text>
            • <Text style={styles.dataKey}>Duration</Text>: {duration}
          </Text>
        </View>
      </View>
      <Text>{desc[0]}</Text>
      {desc.slice(1).map((descItem, index) => (
        <Text key={index}>
          {/* Magic trick to indent as `textIndent` is not supported */}
          {'\t'}
          {descItem}
        </Text>
      ))}
    </View>
  )
}

export default function Spell({ spellIndexes }) {
  const [isLoading, setIsLoading] = useState(false)
  const [spell, setSpell] = useState(null)

  // FIXME: prevent content to be overflown by tab bar
  const tabBarHeight = useBottomTabBarHeight()
  console.log(tabBarHeight)

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Discover a random D&D fifth edition spell...
      </Text>

      <Button
        disabled={isLoading}
        title="Get a random spell"
        onPress={handlePress}
        color={themeColor}
      />

      <Text style={styles.live} accessibilityLiveRegion="polite">
        New spell fetched
      </Text>

      {isLoading ? (
        <ActivityIndicator marginTop={24} color={themeColor} size="large" />
      ) : spell ? (
        <SpellDetails {...spell} />
      ) : null}
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
  live: {
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    width: 1
  },
  details: {
    borderWidth: 4,
    borderColor: themeColor,
    borderRadius: 2,
    marginTop: 24,
    padding: 8
  },
  level: {
    fontStyle: 'italic'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  data: {
    marginVertical: 16
  },
  dataKey: {
    color: themeColor,
    fontWeight: 'bold'
  }
})
