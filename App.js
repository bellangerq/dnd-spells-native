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
              title: 'Random',
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
            children={() => <Spell spellIndexes={spellIndexes} />}
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
            component={History}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}
