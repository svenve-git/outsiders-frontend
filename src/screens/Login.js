import React, { useState } from "react"
import { View, Text, Image, TextInput, Button } from "react-native"

/** TO DO
 * Add login query to the handler
 * Check if we get a token back
 * Add link to sign up page + text
 * Styling
 */

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("email")
  const [password, setPassword] = useState("password")

  return (
    <View>
      <Text>Log In</Text>
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
      <Button title="Log in">Log in</Button>
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
