import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'

import Spell from './components/Spell'
import History from './components/History'
import themeColor from './utils/themeColor'

const Tab = createBottomTabNavigator()

export default function App() {
  const [spellIndexes, setSpellIndexes] = useState([])
  const [fetchedSpells, setFetchedSpells] = useState([])
  const [historyIndex, setHistoryIndex] = useState(null)

  const handleSpellFetch = (spell) => {
    if (
      fetchedSpells.length &&
      fetchedSpells[fetchedSpells.length - 1].index === spell.index
    )
      return

    setFetchedSpells([...fetchedSpells, spell])
  }

  const handleFetchHistory = (spellIndex) => {
    setHistoryIndex(spellIndex)
  }

  const handleResetHistorySpell = () => {
    setHistoryIndex(null)
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
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: themeColor
          }}
        >
          <Tab.Screen
            options={{
              title: 'Spell',
              tabBarLabelStyle: { fontSize: 14 },
              tabBarIcon: ({ focused }) => (
                <Feather
                  name="zap"
                  size={20}
                  color={focused ? themeColor : '#595959'}
                />
              )
            }}
            headerShown={false}
            name="Spell"
            children={() => (
              <Spell
                spellIndexes={spellIndexes}
                onSpellFetch={handleSpellFetch}
                historyIndex={historyIndex}
                onResetHistorySpell={handleResetHistorySpell}
              />
            )}
          />
          <Tab.Screen
            options={{
              tabBarLabelStyle: { fontSize: 14 },
              tabBarIcon: ({ focused }) => (
                <Feather
                  name="database"
                  size={20}
                  color={focused ? themeColor : '#595959'}
                />
              )
            }}
            headerShown={false}
            name="History"
            children={(props) => (
              <History
                spells={fetchedSpells}
                onFetchHistory={handleFetchHistory}
                {...props}
              />
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}
