import React from "react"
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  ImageBackground,
} from "react-native"

/****
 * TO DO:
 * Styling
 * Rewrite microcopy
 */
const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={/*** SET IMAGE BACKGROUND */}>
      <Text>Outsiders</Text>
      <Text>Community-driven outdoor activities</Text>
      <Button title="Sign up" onPress={() => navigation.navigate("Sign up")}>
        Sign up
      </Button>
      <Button title="Log in" onPress={() => navigation.navigate("Log in")}>
        Log in
      </Button>
    </ImageBackground>
  )
}

export default WelcomeScreen
