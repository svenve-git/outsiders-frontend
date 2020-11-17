import React, { useState } from "react"
import { ScrollView, View, StyleSheet, Image, Picker } from "react-native"
import {
  Text,
  FAB,
  ActivityIndicator,
  Divider,
  Headline,
} from "react-native-paper"
import { useQuery } from "@apollo/client"
import { FETCH_ACTIVITIES_AND_TYPES } from "../queries/queries"
// import { FontAwesome5 } from "@expo/vector-icons"
import { TouchableHighlight } from "react-native-gesture-handler"
// import ActivityListing from "../components/ActivityListing"
// import * as Svg from "react-native-svg"
// import SvgUri from "react-native-svg-uri"
import SvgIcon from "../components/SvgIcon"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { color } from "react-native-reanimated"
/**
 * To do:
 * Write component for individual listings
 * Add more details to the activities
 * Add another filter for date
 * Add pagination (and separate fetching again)
 * Add links to activity detail pages
 * Styling
 */

export default function ListScreen({ navigation }) {
  const { loading, error, data } = useQuery(FETCH_ACTIVITIES_AND_TYPES)
  const [activityType, setActivityType] = useState("Any")
  const [showDetails, setShowDetails] = useState(false)
  // const imagepath = require(`../assets/icons/${activity.activityType}.svg`)

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  if (error) return <Text>`Error! ${error.message}`</Text>
  if (!data) return <Text>Not found</Text>

  let listedActivities = [...data.allActivities]
  let activityTypes = [...data.allActivityTypes]

  // console.log("type:", type)
  // console.log("activityTypes:", activityTypes)
  // data.allActivityTypes.map((type) => {
  //   console.log(type)
  // })

  if (activityType) {
    if (activityType === "Any") {
      listedActivities = [...data.allActivities]
    } else {
      listedActivities = data.allActivities.filter((activity) => {
        return activity.activityType.name === activityType
      })
    }
  }
  // console.log("activities", listedActivities)

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 18, alignSelf: "center", margin: 10 }}>
          Select type:{" "}
        </Text>
        <View style={{ marginVertical: 10, borderWidth: 0.5 }}>
          <Picker
            selectedValue={activityType}
            style={{ height: 30, width: 260, color: "black" }}
            onValueChange={(itemValue) => setActivityType(itemValue)}
          >
            <Picker.Item key="Any" label="Any" value="Any" />
            {activityTypes.map((type) => {
              return (
                <Picker.Item
                  key={type.id}
                  label={type.name}
                  value={type.name}
                />
              )
            })}
          </Picker>
        </View>
      </View>
      <ScrollView>
        {loading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          listedActivities.map((activity, index) => (
            // <ActivityListing key={index} props={activity} />
            <View key={activity.id}>
              <TouchableHighlight
                onPress={() => {
                  setShowDetails(index === showDetails ? null : index)
                }}
                style={styles.card}
              >
                <View style={styles.item}>
                  <View style={styles.itemHeader}>
                    <SvgIcon type={activity.activityType} />
                    <Headline style={styles.title}>{activity.title}</Headline>
                  </View>
                  {/* {index === showDetails && ( */}
                  <View style={styles.details}>
                    <Text>
                      Starts: {activity.date} at {activity.startingTime}
                    </Text>
                    <Text>Host: {activity.host.fullName}</Text>
                  </View>
                  {/* )} */}
                </View>
              </TouchableHighlight>
              <Divider style={styles.divider} />
            </View>
          ))
        )}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          navigation.navigate("Create activity")
        }}
      ></FAB>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: "15%",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
  title: {
    marginTop: 5,
  },
  item: {
    backgroundColor: "white",
    flexGrow: 1,
    paddingLeft: 5,
  },
  itemHeader: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignContent: "center",
  },
  details: { marginLeft: 35, paddingBottom: 8 },
  divider: { width: "100%" },
  card: {
    marginLeft: 6,
    marginRight: 10,
    width: "96%",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginBottom: 9,
    paddingBottom: 5,
    elevation: 0.5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF521B",
  },
})
