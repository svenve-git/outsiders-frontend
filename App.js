/**
 *      Imports & configuration
 *
 /** 1 REACT (NATIVE) */
import React, { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

/** 2 NAVIGATION */
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "./src/screens/Login"
import SignUpScreen from "./src/screens/SignUp"
import WelcomeScreen from "./src/screens/Welcome"
import HomeScreen from "./src/screens/Home"

const Stack = createStackNavigator()

/** 3 Apollo Client with authentication 'middleware' */
import AsyncStorage from "@react-native-community/async-storage"
import { cache, isSignedInVar } from "./src/cache"
import { CURRENTUSER } from "./src/queries/queries"
import { setContext } from "@apollo/client/link/context"
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  useQuery,
  makeVar,
  useReactiveVar,
} from "@apollo/client"

/** Setting up authLink so we send along auth headers with our requests to GraphQL */

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

export const client = new ApolloClient({
  cache: cache,
  link: authLink.concat(
    createHttpLink({ uri: "http://192.168.178.18:4000/graphql" })
  ),
})
/** 4 Styling: Paper Material UI */
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper"
import CreateActivityScreen from "./src/screens/CreateActivity"

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
}

/**************************************************************************************************************************************************************************/
/**
 *     App
 */

export default function App() {
  const [loading, setLoading] = useState(true)
  const isSignedIn = useReactiveVar(isSignedInVar)

  // Check if the user is logged in or not
  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem("token")
      if (token) {
        console.log("token in App.js auth check:", token)
        isSignedInVar(true)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
    getToken()
  }, [])

  // Show loading indicator while checking for user
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            {isSignedIn ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                  name="Create activity"
                  component={CreateActivityScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Welcome"
                  options={{ header: () => null }}
                  component={WelcomeScreen}
                />
                <Stack.Screen name="Sign up" component={SignUpScreen} />
                <Stack.Screen name="Log in" component={LoginScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
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
