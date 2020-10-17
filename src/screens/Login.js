import React from "react"
import { View, Text, Image, TextInput, Button } from "react-native"

/** TO DO
 * Add login query to the handler
 * Check if we get a token back
 * Add link to sign up page + text
 * Styling
 */

const LoginScreen = () => {
  handleLogin = (e) => {
    console.log(e)
    return null
  }

  return (
    <View>
      <Text>Log In</Text>
      <TextInput></TextInput>
      <TextInput></TextInput>
      <Button title="Log in" onPress={handleLogin}>
        Log in
      </Button>
    </View>
  )
}

export default LoginScreen
