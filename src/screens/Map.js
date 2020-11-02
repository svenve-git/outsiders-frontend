import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps"
import { ActivityIndicator, FAB } from "react-native-paper"
import { FETCH_ACTIVITIES } from "../queries/queries"
import moment from "moment"

/**
 * To Do:
 * - update seeder => set some different locations
 * - add filters for activityType
 * - add custom marker for each type
 * - Styling -> theme, callouts, filters
 */

export default function MapScreen({ navigation }) {
  const { loading, error, data } = useQuery(FETCH_ACTIVITIES)
  const [date, setDate] = useState("")

  let today = moment().format("YYYY-MM-DD")
  let tomorrow = moment(today).add(1, "day").format("YYYY-MM-DD")
  let nextWeek = moment(today).add(7, "days").format("YYYY-MM-DD")

  /**
   *  Conditionals
   */

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  if (error) return <Text>`Error! ${error.message}`</Text>
  if (!data) return <Text>Not found</Text>

  // console.log("today:", today, "tomorrow:", tomorrow)
  // console.log("Data in MapScreen:", data.allActivities)
  // console.log("Date in MapScreen:", date)

  /**
   *  Filters
   */

  let activities = [...data.allActivities]
  // console.log("activities before filtered", activities)

  if (date) {
    if (date === "") {
      activities = [...data.allActivities]
    } else if (date === "this week") {
      activities = data.allActivities.filter((activity) => {
        return moment(activity.date).isBetween(today, nextWeek)
      })
    } else
      activities = data.allActivities.filter((activity) => {
        return activity.date === date
      })
  }

  // console.log("activities to be rendered", activities)

  return (
    <View style={styles.container}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 52.369946,
          longitude: 4.897441,
          latitudeDelta: 0.0699,
          longitudeDelta: 0.0699,
        }}
        style={styles.map}
      >
        {activities.map((activity) => {
          return (
            <Marker
              key={activity.id}
              coordinate={{
                latitude: activity.latitude,
                longitude: activity.longitude,
              }}
            >
              <Callout>
                <Text style={{ fontWeight: "bold" }}>{activity.title}</Text>
                <Text>Host: {activity.host.fullName}</Text>
                <Text style={{ fontStyle: "italic" }}>{activity.date}</Text>
                <Text>Starts at: {activity.startingTime}</Text>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
      <>
        <FAB
          style={styles.filter1}
          label="today"
          onPress={() => {
            setDate(today)
          }}
        />
        <FAB
          style={styles.filter2}
          label="tomorrow"
          onPress={() => {
            setDate(tomorrow)
          }}
        />
        <FAB
          style={styles.filter3}
          label="this week"
          onPress={() => {
            setDate("this week")
          }}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => {
            navigation.navigate("Create activity")
          }}
        />
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    height: "100%",
    ...StyleSheet.absoluteFillObject,
    // flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  filter1: {
    position: "absolute",
    margin: 10,
    top: 0,
    left: 0,
  },
  filter2: {
    position: "absolute",
    margin: 10,
    top: 0,
  },
  filter3: {
    position: "absolute",
    margin: 10,
    top: 0,
    right: 0,
  },
})
