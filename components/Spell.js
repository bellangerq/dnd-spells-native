import React, { useEffect, useState } from 'react'
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
      <View style={styles.dataList}>
        <View>
          <Text style={styles.dataItem}>
            • <Text style={styles.dataTitle}>Casting time</Text>: {casting_time}
          </Text>
        </View>
        <View>
          <Text style={styles.dataItem}>
            • <Text style={styles.dataTitle}>Range</Text>: {range}
          </Text>
        </View>
        <View>
          <Text style={styles.dataItem}>
            • <Text style={styles.dataTitle}>Components</Text>:{' '}
            {components.join(', ') + (material ? ` (${material})` : '')}
          </Text>
        </View>
        <View>
          <Text style={styles.dataItem}>
            • <Text style={styles.dataTitle}>Duration</Text>: {duration}
          </Text>
        </View>
      </View>
      <Text style={styles.description}>{desc[0]}</Text>
      {desc.slice(1).map((descItem, index) => (
        <Text style={styles.description} key={index}>
          {/* Magic trick to indent as `textIndent` is not supported */}
          {'\t'}
          {descItem}
        </Text>
      ))}
    </View>
  )
}

export default function Spell({
  spellIndexes,
  onSpellFetch,
  historyIndex,
  onResetHistorySpell
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [spell, setSpell] = useState(null)

  const tabBarHeight = useBottomTabBarHeight()

  /**
   * Fetch a spell based on its slug
   * @param {string} slug
   */
  const fetchSpell = (slug) => {
    const url = `https://www.dnd5eapi.co/api/spells/${slug}`

    setIsLoading(true)

    fetch(url)
      .then((res) => res.json())
      .then((spell) => {
        setSpell(spell)
        onSpellFetch(spell)
        setIsLoading(false)
        onResetHistorySpell()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handlePress = () => {
    const index = spellIndexes[Math.floor(Math.random() * spellIndexes.length)]

    fetchSpell(index)
  }

  useEffect(() => {
    if (historyIndex) {
      fetchSpell(historyIndex)
    }
  }, [historyIndex])

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: tabBarHeight }}
      style={styles.container}
    >
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
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16
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
    fontSize: 18,
    fontStyle: 'italic'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  dataList: {
    marginVertical: 16
  },
  dataItem: {
    fontSize: 18
  },
  dataTitle: {
    color: themeColor,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 18
  }
})
