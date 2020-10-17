import React from "react"
import { View, Text, Image, TextInput, Button } from "react-native"

/** TO DO
 * Add button (handler)
 * Add form + form state management
 * Add link to login page for users that already have an account
 * Test if new users are added to the DB
 * Styling
 */

const SignUpScreen = () => {
  handleSignUp = (e) => {
    console.log(e)
    return null
  }

  return (
    <View>
      <Text>Sign up</Text>
      <TextInput></TextInput>
      <TextInput></TextInput>
      <Button title="Sign up" onPress={handleSignUp}>
        Sign up
      </Button>
    </View>
  )
}

export default SignUpScreen
