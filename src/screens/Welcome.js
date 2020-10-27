import React from "react"
import { View, StyleSheet, ImageBackground } from "react-native"
import { Button, Text, Title, Headline } from "react-native-paper"
/****
 * TO DO:
 * Styling
 * Rewrite microcopy
 */
export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={{
        height: "100%",
        // alignContent: "center",
        // justifyContent: "center",
        // alignSelf: "center"
      }}
      source={require("../assets/backgroundv3.png")}
    >
      <View style={styles.container}>
        <Headline style={styles.headline}>Outsiders</Headline>
        <Text style={{ marginTop: 450, fontSize: 20 }}>
          Community-based outdoor activities
        </Text>
        <View style={styles.buttons}>
          <Button title="Signup" onPress={() => navigation.navigate("Sign up")}>
            Sign up
          </Button>
          <Button title="Login" onPress={() => navigation.navigate("Log in")}>
            Log in
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headline: {
    marginTop: 60,
    fontSize: 32,
  },
  buttons: {
    marginTop: 20,
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
  },
})
