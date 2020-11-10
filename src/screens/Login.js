import React, { useState } from "react"
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native"
import { Text, TextInput, Button } from "react-native-paper"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries/queries"
import { isSignedInVar } from "../config"
import AsyncStorage from "@react-native-community/async-storage"

export default function LoginScreen({ navigation }) {
  /**
   * Form State
   */
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  /**
   * Handlers
   */
  const [Login, { data }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      console.log("Login response:", data.login)
      AsyncStorage.multiSet([
        ["token", data.login.token],
        ["user", JSON.stringify(data.login.user)],
      ])
      isSignedInVar({ user: data.login.user, token: data.login.token })
    },
  })

  const handleLogin = async (e) => {
    try {
      await Login({ variables: { email: email, password: password } })
    } catch (e) {
      console.log("error:", e)
    }
  }
  /**
   * View output
   */
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/55951.jpg")}
      />
      <KeyboardAvoidingView style={styles.form}>
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          placeholder="example@mail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="verystrongpassword"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Log in" onPress={handleLogin}>
          Log in
        </Button>
        <Text style={{ marginTop: "5%" }}>
          No account?{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => navigation.navigate("Sign up")}
          >
            Sign up
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </View>
  )
}

/**
 * Styling
 */

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    marginTop: "10%",
  },
  background: {
    height: "80%",
    width: "100%",
  },
  form: {
    // flex: 1,
    alignItems: "center",
    marginTop: "-30%",
    backgroundColor: "white",
  },
  input: {
    height: 40,
    width: 250,
    backgroundColor: "white",
    marginBottom: "5%",
  },
  heading: {
    fontSize: 40,
    fontWeight: "600",
  },
})
