import React, { useState } from "react"
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native"

/** TO DO
 * Add button (handler)
 * Add form + form state management
 * Add link to login page for users that already have an account
 * Test if new users are added to the DB
 * Make gender a dropdown / button input
 * Styling
 */

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("name")
  const [email, setEmail] = useState("email")
  const [password, setPassword] = useState("password")
  const [address, setAddress] = useState("address")
  const [gender, setGender] = useState("gender")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // const [form, setForm] = useState("")

  // const handleTextInput = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value })
  // }

  handleSignUp = (e) => {
    if (!name || !email || !password || !address || !gender) {
      setMessage("Please fill in all the required fields")
    }
    setLoading(true)

    console.log(e)
    return null
  }

  return (
    <View style={styles.container}>
      <Text>Sign up</Text>
      <Text>{message}</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="name*"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="email*"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="password*"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="address*"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="gender*"
        value={gender}
        onChangeText={(text) => setGender(text)}
      />
      <Button title="Sign up" onPress={handleSignUp}>
        Sign up
      </Button>
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
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff",
  },
})
