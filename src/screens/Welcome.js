import { useQuery } from "@apollo/client"
import React from "react"
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native"
/****
 * TO DO:
 * Styling
 * Rewrite microcopy
 */
export default function WelcomeScreen({ navigation }) {
  return (
    // <ImageBackground source={/*** SET IMAGE BACKGROUND */}>
    <View style={styles.container}>
      <Text style={styles.heading}>Outsiders</Text>
      <Text style={styles.text}>Community-driven outdoor activities</Text>
      <View styles={styles.buttons}>
        <Button title="Signup" onPress={() => navigation.navigate("Sign up")}>
          Sign up
        </Button>
        <Button title="Login" onPress={() => navigation.navigate("Log in")}>
          Log in
        </Button>
      </View>
    </View>
    // </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  heading: {
    marginTop: 40,
    marginBottom: 40,
    fontSize: 40,
    fontWeight: "600",
  },
  buttons: {
    marginTop: 80,
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
  },
})
