/**
 *      Imports & configuration
 *
/** 1 REACT */
import React from "react"
import { StyleSheet, Text, View } from "react-native"
/** 2 NAVIGATION */
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import HomeScreen from "./src/screens/Home"
// import MapScreen from "./src/screens/Map"
// import ListScreen from "./src/screens/List"
// import ProfileScreen from "./src/screens/Profile"
import LoginScreen from "./src/screens/Login"
import SignUpScreen from "./src/screens/SignUp"
import WelcomeScreen from "./src/screens/Welcome"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

/** 3 APOLLOCLIENT  */
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

/**************************************************************************************************************************************************************************/
/** TO DO:
 * Review Navigation: choose whether and if so how to nest the navigation. List & Map are definitely tabs, and can maybe be nested in Home. Where to add settings/profile..
 * Add a loading screen that is displayed while checking for a token in Asyncstorage
 * Work out the isSignedIn logic => add token verification
 */

/**
 *     Our App
 */
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {/* isSignedIn ? ( */}
        {/* <Tab.Navigator initialRouteName="Home"> */}
        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
        {/* <Tab.Screen name="List" component={ListScreen} /> */}
        {/* <Tab.Screen name="Map" component={MapScreen} /> */}
        {/* </Tab.Navigator> */}
        {/* ) : ( */}
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Sign up" component={SignUpScreen} />
          <Stack.Screen name="Log in" component={LoginScreen} />
        </Stack.Navigator>
        {/* ) */}
      </NavigationContainer>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
