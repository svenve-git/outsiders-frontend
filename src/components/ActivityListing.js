import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import Animated from "react-native-reanimated"
// import {} from ""
import { TouchableHighlight } from "react-native-gesture-handler"
import { Divider } from "react-native-paper"

/**
 * To do:
 * - import icons
 * - add animations to icons
 */

export default function ActivityListing(props) {
  const [showDetails, setShowDetails] = useState(false)
  console.log(props)
  // const transition = useTransition(
  //   open,
  //   open ? 0 : 1,
  //   open ? 1 : 0,
  //   400,
  //   Easing
  // )
  // const height = show ? "auto" : 0
  // const bottomRadius = open ? 0 : 8

  return (
    <View style={styles.listItem}>
      <TouchableHighlight
        onPress={() => {
          setShowDetails((prev) => !prev)
        }}
        key={props.id}
      >
        <>
          <FontAwesome5 name="running" />
          <Text>{props.title}</Text>
          {showDetails && (
            <View>
              <Text>
                Starts: {props.date} at {props.startingTime}
              </Text>
              <Text>Host: {props.host.fullName}</Text>
            </View>
          )}

          <Divider />
        </>
      </TouchableHighlight>
    </View>
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
