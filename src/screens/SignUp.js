import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { useMutation } from "@apollo/client"
import { SIGNUP } from "../queries/queries"
import AsyncStorage from "@react-native-community/async-storage"
import { isSignedInVar } from "../cache"

export default function SignUpScreen({ navigation }) {
  /**
   *  Form state management
   */
  const [fullName, setName] = useState("Marie Klaassen")
  const [email, setEmail] = useState("marie@mail.nl")
  const [password, setPassword] = useState("verystrongpassword")
  const [address, setAddress] = useState("Damrak 3, 1012MB, Amsterdam")
  const [gender, setGender] = useState("Female")

  /**
   *  App state management
   */
  const [message, setMessage] = useState("")

  /**
   *  Handlers
   */
  const [SignUp, { data }] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      AsyncStorage.setItem("token", data.signup)
      isSignedInVar(true)
    },
  })

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!fullName || !email || !password || !address || !gender) {
      setMessage("Please fill in all the required fields")
    } else
      try {
        await SignUp({
          variables: { fullName, email, password, address, gender },
        })
      } catch (e) {
        console.log("error:", e)
      }
  }

  /**
   *  View output
   */
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign up</Text>
      <Text>{message}</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="name*"
          value={fullName}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="email*"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password*"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="address*"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="gender*"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />
        <Button title="Sign up" onPress={handleSignUp}>
          Sign up
        </Button>
      </View>
      <View style={styles.text}>
        <Text>
          Already have an account?{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => navigation.navigate("Log in")}
          >
            Log in
          </Text>
        </Text>
      </View>
    </View>
  )
}

/**
 *  Stylesheet
 */

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  form: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  input: {
    height: 40,
    width: 300,
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
  },
  heading: {
    fontSize: 40,
    fontWeight: "600",
    marginTop: 40,
  },
  text: {
    marginTop: 30,
  },
})
