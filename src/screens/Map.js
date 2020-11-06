import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps"
import { ActivityIndicator, FAB } from "react-native-paper"
import { FETCH_ACTIVITIES } from "../queries/queries"
import moment from "moment"

/**
 * To Do:
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

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <FAB
          style={{ margin: "1%" }}
          label="today"
          onPress={() => {
            setDate(today)
          }}
        />
        <FAB
          style={{ margin: "1%" }}
          label="tomorrow"
          onPress={() => {
            setDate(tomorrow)
          }}
        />
        <FAB
          style={{ margin: "1%" }}
          label="this week"
          onPress={() => {
            setDate("this week")
          }}
        />
      </View>
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

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          navigation.navigate("Create activity")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: "center",
  },
  map: {
    height: "100%",
    ...StyleSheet.absoluteFillObject,
    // flex: 1,
  },
  filters: {
    margin: "2%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
