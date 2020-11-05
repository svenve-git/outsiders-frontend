/**
 *      Imports & configuration
 *
 /** 1 REACT (NATIVE) */
import React, { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

/** 2 NAVIGATION */
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import CreateActivityScreen from "./src/screens/CreateActivity"
import LoginScreen from "./src/screens/Login"
import SignUpScreen from "./src/screens/SignUp"
import WelcomeScreen from "./src/screens/Welcome"
import HomeScreen from "./src/screens/Home"

const Stack = createStackNavigator()

/** 3 Apollo Client with authentication 'middleware' */
import AsyncStorage from "@react-native-community/async-storage"
import { theme, client, isSignedInVar } from "./src/config"
import { ApolloProvider, useReactiveVar } from "@apollo/client"

/** Setting up authLink so we send along auth headers with our requests to GraphQL */

/** 4 Styling: Paper Material UI */
import { Provider as PaperProvider } from "react-native-paper"

/**************************************************************************************************************************************************************************/
/**
 *     App
 */

export default function App() {
  const [loading, setLoading] = useState(true)
  const isSignedIn = useReactiveVar(isSignedInVar)

  // Check if there's still a valid token in local storage
  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem("token")
      if (token) {
        // console.log("token found in App.js auth check:", token)
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
                  // screenOptions={{}}
                  component={WelcomeScreen}
                />
                <Stack.Screen
                  name="Sign up"
                  options={{ header: () => null }}
                  component={SignUpScreen}
                />
                <Stack.Screen
                  name="Log in"
                  options={{ header: () => null }}
                  component={LoginScreen}
                />
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
