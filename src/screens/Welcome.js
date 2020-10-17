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
export default function WelcomeScreen({ navigation }) {
  return (
    // <ImageBackground source={/*** SET IMAGE BACKGROUND */}>
    <View>
      <Text style={{ textAlign: "center", fontSize: 40, fontWeight: "bold" }}>
        Outsiders
      </Text>
      <Text style={{ textAlign: "center", fontStyle: "italic" }}>
        Community-driven outdoor activities
      </Text>
      <Button title="Signup" onPress={() => navigation.navigate("Sign up")}>
        Sign up
      </Button>
      <Button title="Login" onPress={() => navigation.navigate("Log in")}>
        Log in
      </Button>
    </View>
    // </ImageBackground>
  )
}
