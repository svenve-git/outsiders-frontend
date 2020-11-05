import React from "react"
import { View, StyleSheet, ImageBackground } from "react-native"
import { Button, Text, Headline } from "react-native-paper"

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={{
        height: "100%",
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
    marginTop: "15%",
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
