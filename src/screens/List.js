import React, { useEffect, useState } from "react"
import { ScrollView, View, Text, StyleSheet } from "react-native"
// import { Picker } from "@react-native-community/picker"
import { useQuery, gql } from "@apollo/client"
import { FETCH_ACTIVITIES, FETCH_ACTIVITYTYPES } from "../queries/queries"

/**
 * To do:
 * Make sure activities are fetched before rendering
 * Fix Picker
 * Add more details to the activities
 * Add another filter for date
 * Add links to activity detail pages
 * Styling
 */

export default function ListScreen({ navigation }) {
  const { loading, error, data: activities } = useQuery(FETCH_ACTIVITIES)
  const { loading: loading2, error: err, data: types } = useQuery(
    FETCH_ACTIVITYTYPES
  )
  const [type, setType] = useState("")

  const listedActivities = activities.allActivities.filter((activity) => {
    if (type) {
      activity.activityType === type
    } else return activity
  })

  // if (error || err) {
  //   return (
  //     <View>
  //       <Text>Error: {error || err}</Text>
  //     </View>
  //   )
  // }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Activities</Text>
      {/* <Picker
        selectedValue={type}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue) => setType(itemValue)}
      >
        {types.allActivityTypes.map((type) => (
          <Picker.Item label={type.name} value={type.name} />
        ))}
      </Picker> */}
      {loading || loading2 ? (
        <Text>Loading</Text>
      ) : (
        listedActivities.map((activity) => (
          <View key={activity.id}>
            <Text>{activity.title}</Text>
            <Text>{activity.date}</Text>
          </View>
        ))
      )}
      <Text style={{ marginTop: 40 }}>
        No account?{" "}
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Sign up")}
        >
          Sign up
        </Text>
      </Text>
      <Text
        style={{ color: "blue" }}
        onPress={() => navigation.navigate("Log in")}
      >
        Log in
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 5,
  },
  heading: {
    marginTop: 40,
    marginBottom: 40,
    fontSize: 40,
    fontWeight: "600",
  },
  buttons: {
    marginTop: 80,
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
  },
})
