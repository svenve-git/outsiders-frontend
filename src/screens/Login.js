import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries/queries"
import { isSignedInVar } from "../cache"
import AsyncStorage from "@react-native-community/async-storage"

export default function LoginScreen({ navigation }) {
  /**
   * Form State
   */
  const [email, setEmail] = useState("test@mail.com")
  const [password, setPassword] = useState("123")
  /**
   * Handlers
   */
  const [Login, { data }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      AsyncStorage.setItem("token", data.login)
      isSignedInVar(true)
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
    <View style={styles.form}>
      <Text style={styles.heading}>Log In</Text>
      <View>
        <Text>Enter email:</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          placeholder="example@mail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View>
        <Text>Enter password:</Text>
        <TextInput
          style={styles.input}
          placeholder="verystrongpassword"
          label="Enter password:"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button title="Log in" onPress={handleLogin}>
        Log in
      </Button>
      <Text>
        No account?{" "}
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Sign up")}
        >
          Sign up
        </Text>
      </Text>
    </View>
  )
}

/**
 * Styling
 */

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 7,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
  },
  heading: {
    fontSize: 40,
    fontWeight: "600",
  },
})
