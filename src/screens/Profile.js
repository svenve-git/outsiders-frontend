import { useQuery, useReactiveVar } from "@apollo/client"
import AsyncStorage from "@react-native-community/async-storage"
import React from "react"
import { View, StyleSheet } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import {
  ActivityIndicator,
  Button,
  Card,
  Headline,
  Paragraph,
  Text,
} from "react-native-paper"
import { client, isSignedInVar } from "../config"
import { CURRENTUSER } from "../queries/queries"

export default function ProfileScreen({ navigation }) {
  const isSignedIn = useReactiveVar(isSignedInVar)
  const { loading, data: user } = useQuery(CURRENTUSER)

  console.log("Got the user or not?", user)

  const logout = async () => {
    await AsyncStorage.removeItem("token")
    client.resetStore()
    isSignedInVar(false)
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FontAwesome5 name="user" size={50} style={{ padding: 25 }} />
      <Headline style={{ padding: 15 }}>{user.currentUser.fullName}</Headline>
      <Text style={{ padding: 15 }}>{user.currentUser.address}</Text>
      <Card>
        <Card.Title title="My favourite activities" />
        <Card.Content>
          <Paragraph>Football</Paragraph>
          <Paragraph>Jiu-jitsu</Paragraph>
          <Paragraph>Freediving</Paragraph>
          <Paragraph>Biljart</Paragraph>
          <Paragraph>Beachtennis</Paragraph>
          <Paragraph>Canyoning</Paragraph>
          <Paragraph>Power walking</Paragraph>
        </Card.Content>
      </Card>
      {/* <Card>
        <Card.Title title="Friends" />
      </Card> */}
      <Button style={{ marginTop: "20%" }} onPress={logout}>
        Log out
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
  },
})
