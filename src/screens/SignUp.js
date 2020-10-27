import React, { useState } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { Text, TextInput, Button } from "react-native-paper"
import { FontAwesome5 } from "@expo/vector-icons"
import { useMutation } from "@apollo/client"
import { SIGNUP } from "../queries/queries"
import AsyncStorage from "@react-native-community/async-storage"
import { isSignedInVar } from "../config"

/**
 * To do:
 * Add confirmation that account is made!
 * And maybe a brief intro to the app
 */

export default function SignUpScreen({ navigation }) {
  /**
   *  Form state management
   */
  const [fullName, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")

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
          placeholder="name"
          value={fullName}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: 30,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Pressable
            onPress={() => {
              setGender("Female")
              console.log("I'm pressed")
            }}
          >
            <FontAwesome5
              name="venus"
              size={28}
              color={gender === "Female" ? "#FF521B" : "black"}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setGender("Male")
            }}
          >
            <FontAwesome5
              name="mars"
              size={28}
              color={gender === "Male" ? "#FF521B" : "black"}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setGender("Transgender")
            }}
          >
            <FontAwesome5
              name="transgender-alt"
              size={28}
              color={gender === "Transgender" ? "#FF521B" : "black"}
            />
          </Pressable>
        </View>
        <Button
          title="Sign up"
          color={
            fullName && email && password && address && gender
              ? "#FF521B"
              : "grey"
          }
          onPress={handleSignUp}
        >
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
    // padding: 20,
    // backgroundColor: "#ffffff",
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
