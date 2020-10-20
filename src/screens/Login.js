import React, { useState } from "react"
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native"
import { useMutation, useQuery, gql } from "@apollo/client"
import { LOGIN, CURRENTUSER } from "../queries/queries"
import * as SecureStore from "expo-secure-store"
import AsyncStorage from "@react-native-community/async-storage"

export default function LoginScreen({ navigation, setSignedIn }) {
  const [email, setEmail] = useState("test@mail.com")
  const [password, setPassword] = useState("123")
  const [Login, data] = useMutation(LOGIN)

  console.log("@login", data)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await Login({ variables: { email: email, password: password } })
      // SecureStore.setItemAsync(loggedIn, data)
      console.log("data after login attempt", data)
      await AsyncStorage.setItem("token", data.login)
      setSignedIn(true)
    } catch (e) {
      console.log("error:", e)
    }
    // CLEAR DATA FROM INPUT FIELDS?
  }

  // const user = useQuery(CURRENTUSER)
  // console.log("User", user)

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
