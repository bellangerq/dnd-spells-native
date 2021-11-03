import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import themeColor from '../utils/themeColor'

export default function History({ spells, onFetchHistory, navigation }) {
  const handlePress = (index) => {
    navigation.navigate('Spell')
    onFetchHistory(index)
  }

  const tabBarHeight = useBottomTabBarHeight()

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: tabBarHeight }}
      style={styles.container}
    >
      <Text style={styles.heading}>History</Text>
      <View style={styles.list}>
        {spells.map((spell, i) => {
          return (
            <View style={styles.listItemContainer} key={`${spell.index}-${i}`}>
              <Text>•</Text>
              <TouchableOpacity onPress={() => handlePress(spell.index)}>
                <Text style={styles.listItem}>{spell.name}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
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
  list: {
    display: 'flex'
  },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4
  },
  listItem: {
    fontSize: 18,
    textDecorationLine: 'underline',
    textDecorationColor: themeColor,
    textDecorationStyle: 'solid',
    marginLeft: 8
  }
})
