import React from "react"
// import { SvgFromUri } from "react-native-svg"
// import SvgUri from "react-native-svg-uri"
// import Walking from "../assets/icons/Walking.svg"
// import Running from "../assets/icons/Running.svg"
// import Cycling from "../assets/icons/Cycling.svg"
// import Swimming from "../assets/icons/Swimming.svg"
// import Fitness from "../assets/icons/Fitness.svg"
// import Football from "../assets/icons/Football.svg"
// import Hockey from "../assets/icons/Hockey.svg"
// import Tennis from "../assets/icons/Tennis.svg"
// import Basketball from "../assets/icons/Basketball.svg"
// import Volleyball from "../assets/icons/Volleyball.svg"
// import Rugby from "../assets/icons/Rugby.svg"
// import Frisbee from "../assets/icons/Frisbee.svg"
// import TaiChi from "../assets/icons/TaiChi.svg"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { View, Text } from "react-native"

export default function SvgIcon(activity) {
  return activity.type.name === "Walking" ? ( // <Walking />
    <MaterialCommunityIcons
      name="walk"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Running" ? ( // <Running />
    <MaterialCommunityIcons
      name="run-fast"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Cycling" ? ( // <Cycling />
    <MaterialCommunityIcons
      name="bike"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Swimming" ? ( // <Swimming />
    <MaterialCommunityIcons
      name="swim"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Fitness" ? ( // <Fitness />
    <MaterialCommunityIcons
      name="heart-pulse"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Football" ? ( // <Football />
    <MaterialCommunityIcons
      name="soccer"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Hockey" ? ( // <Hockey />
    <MaterialCommunityIcons
      name="hockey-sticks"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Tennis" ? ( // <Tennis />
    <MaterialCommunityIcons
      name="tennis"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Basketball" ? ( // <Basketball />
    <MaterialCommunityIcons
      name="basketball"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Volleyball" ? ( // <Volleyball />
    <MaterialCommunityIcons
      name="volleyball"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Rugby football" ? ( // <Rugby />
    <MaterialCommunityIcons
      name="rugby"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Frisbee" ? ( // <Frisbee />
    <MaterialCommunityIcons
      name="disc"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : activity.type.name === "Tai Chi" ? ( // <TaiChi />
    <MaterialCommunityIcons
      name="karate"
      size={24}
      color="black"
      style={{ paddingTop: 10, paddingRight: 10 }}
    />
  ) : (
    <Text>Hello</Text>
  )
}
