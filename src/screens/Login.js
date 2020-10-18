import React, { useState } from "react"
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native"
import { useMutation, gql } from "@apollo/client"
import { LOGIN } from "../queries/queries"

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("test@mail.com")
  const [password, setPassword] = useState("123")
  const [Login, { data }] = useMutation(LOGIN)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      Login({ variables: { email: email, password: password } })
    } catch (error) {
      console.log("error:", error)
    }
    // CLEAR DATA FROM INPUT FIELDS?
  }

  return (
    <View style={styles.form}>
      <Text style={styles.heading}>Log In</Text>
      <View>
        <Text>Enter email:</Text>
        <TextInput
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
          label="Enter email:"
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
