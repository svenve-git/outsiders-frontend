import React, { useState } from "react"
import { View, Text } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import Animated from "react-native-reanimated"
import {} from ""

/**
 * To do:
 * - import icons
 * - add animations to icons
 */

export default function ActivityListing(props) {
  const [show, setShow] = useState(false)
  const transition = useTransition(
    open,
    open ? 0 : 1,
    open ? 1 : 0,
    400,
    Easing
  )
  const height = show ? "auto" : 0
  const bottomRadius = open ? 0 : 8

  return (
    <Pressable
      onPress={() => {
        console.log("I'm pressed", props.title)
        setShowDetails((prev) => !prev)
      }}
      key={props.id}
    >
      <Animated.View style={styles.listItem}>
        <FontAwesome5 name="running" />
        <Text>{props.title}</Text>
        <Text></Text>
        <Button title="View" />
        <Divider />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginBottom: 3,
    elevation: 3,
  },
})
