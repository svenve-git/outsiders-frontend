import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesome5 } from "@expo/vector-icons"
import MapScreen from "./Map"
import ListScreen from "./List"
import ProfileScreen from "./Profile"

const Tab = createBottomTabNavigator()

export default function HomeScreen({ navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Profile") {
            iconName = "user"
          } else if (route.name === "Map") {
            iconName = "map-marked-alt"
          } else if (route.name === "List") {
            iconName = "list"
          }
          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
