import React, { useState } from "react"
import { ScrollView, View, StyleSheet, Pressable, Picker } from "react-native"
import {
  Text,
  Button,
  FAB,
  Title,
  Paragraph,
  List,
  ActivityIndicator,
  Divider,
} from "react-native-paper"
import { useQuery } from "@apollo/client"
import { FETCH_ACTIVITIES_AND_TYPES } from "../queries/queries"
import { FontAwesome5 } from "@expo/vector-icons"
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler"
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
      <View>
        <Picker
          selectedValue={activityType}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue) => setActivityType(itemValue)}
        >
          <Picker.Item key="Any" label="Any" value="Any" />
          {activityTypes.map((type) => {
            return (
              <Picker.Item key={type.id} label={type.name} value={type.name} />
            )
          })}
        </Picker>
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
            <View style={styles.listItem}>
              <TouchableHighlight
                onPress={() => {
                  setShowDetails(index === showDetails ? null : index)
                }}
                key={activity.id}
              >
                <FontAwesome5 name="running" />
                <Text>{activity.title}</Text>
                {index === showDetails && (
                  <View style={styles.details}>
                    <Text>
                      Starts: {activity.date} at {activity.startingTime}
                    </Text>
                    <Text>Host: {activity.host.fullName}</Text>
                  </View>
                )}

                <Divider />
              </TouchableHighlight>
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
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  // buttons: {
  //   marginTop: 80,
  //   marginBottom: 40,
  // },
  text: {
    fontSize: 20,
  },
  listItem: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "nowrap",

    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginBottom: 3,
    elevation: 3,
  },
  details: {},
  card: {
    height: 50,
    marginLeft: 6,
    marginRight: 6,
    width: 300,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
