import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import themeColor from '../utils/themeColor'

export default function Spell({
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

  const spellLevel =
    level === 0
      ? `${school.name} cantrip`
      : `${pluralize(level)}-level` + ' ' + school.name.toLowerCase()

  return (
    <View style={styles.container}>
      <Text style={styles.live} accessibilityLiveRegion="polite">
        New spell fetched
      </Text>
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

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 4,
    borderColor: themeColor,
    borderRadius: 2
  },
  live: {
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    width: 1
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center'
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
