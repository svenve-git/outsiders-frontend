/**
 *      Imports & configuration
 *
/** 1 REACT (NATIVE) */
import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"

/** 2 NAVIGATION */
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import HomeScreen from "./src/screens/Home"
// import MapScreen from "./src/screens/Map"
import ListScreen from "./src/screens/List"
// import ProfileScreen from "./src/screens/Profile"
import LoginScreen from "./src/screens/Login"
import SignUpScreen from "./src/screens/SignUp"
import WelcomeScreen from "./src/screens/Welcome"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

/** 3 Apollo Client with authentication 'middleware' */
// import * as SecureStore from "expo-secure-store  // this package should provide more secure storage than Async but is not working for some reason
import AsyncStorage from "@react-native-community/async-storage"
import { setContext } from "@apollo/client/link/context"
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem("token")

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(
    createHttpLink({ uri: "http://192.168.178.18:4000/graphql" })
  ),
})

/** 5 REDUX STORE */
import { Provider, useSelector, useDispatch } from "react-redux"
import { selectUser } from "./src/store/user/selectors"
import store from "./src/store"

/**************************************************************************************************************************************************************************/
/** TO DO:
 * Add a loading screen that is displayed while checking for a token in Asyncstorage
 * See if App updates based on isSignedIn if we go through Async storage (so without passing down callback setSignedIn)
 */

/**
 *     App
 */

export default function App() {
  // const [isSignedIn, setSignedIn] = useState(false)

  // useEffect(() => {
  //   async function getToken() {
  //     const token = await AsyncStorage.getItem("token")
  //     console.log("token in App.js useEffect:", token)
  //     if (token) {
  //       setSignedIn(true)
  //     }
  //   }
  //   getToken()
  // }, [])

  const isSignedIn = AsyncStorage.getItem("token")
  console.log("signed in?", isSignedIn)

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        {/* <NavigationContainer> */}
        {/* <Stack.Navigator initialRouteName="List"> */}
        {/* <Tab.Navigator initialRouteName="Home"> */}
        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
        {/* <Tab.Screen name="Map" component={MapScreen} /> */}
        {/* </Tab.Navigator> */}
        {/* </Stack.Navigator> */}
        {/* </NavigationContainer> */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            {isSignedIn ? (
              <>
                <Stack.Screen name="List" component={ListScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Sign up" component={SignUpScreen} />
                <Stack.Screen
                  name="Log in"
                  component={(props) => (
                    <LoginScreen {...props} setSignedIn={setSignedIn} />
                  )}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  )
}

/**
 *     Styling
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
