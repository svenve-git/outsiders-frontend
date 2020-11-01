import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { useMutation, useQuery } from "@apollo/client"
import { Picker } from "@react-native-community/picker"
import {
  FETCH_ACTIVITYTYPES,
  CREATE_ACTIVITY,
  CURRENTUSER,
} from "../queries/queries"
import {
  Text,
  TextInput,
  Button,
  Switch,
  Portal,
  Modal,
  IconButton,
  ActivityIndicator,
} from "react-native-paper"
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"

/**
 * To do:
 * Implement a map to set lat/long
 *      - set LatLong onDragEnd
 * Fix dateTimePicker
 * Styling
 */

export default function CreateActivityScreen({ navigation }) {
  const [createActivity, response] = useMutation(CREATE_ACTIVITY)
  const { data: currentUser } = useQuery(CURRENTUSER, {
    onCompleted() {
      setHostId(parseInt(currentUser.currentUser.id))
    },
  })
  const { loading, error, data } = useQuery(FETCH_ACTIVITYTYPES)
  const [message, setMessage] = useState("")

  /**
   *    MapView
   */

  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)

  const hideModal = () => setVisible(false)

  const initialRegion = {
    latitude: 52.382534,
    longitude: 4.913762,
    latitudeDelta: 0.0299,
    longitudeDelta: 0.0299,
  }

  const initialMarker = {
    latitude: 52.382534,
    longitude: 4.913762,
  }
  // const [region, setRegion] = useState(initialRegion)
  const [marker, setMarker] = useState(initialMarker)

  // console.log("Marker location:", marker)

  /**
   *    DateTimePicker
   */

  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "iOS") // <---------- Double check in the docs if this is a legitimate value
    setDate(moment(selectedDate).format("YYYY-MM-DD"))
    setStartingTime(moment(selectedDate).format("HH:mm")) // <--------------- refactor with moment
    console.log("selected date:", currentDate, "start time:", startingTime)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode("date")
  }

  const showTimepicker = () => {
    showMode("time")
  }

  /**
   * Form state & submit
   */
  const [title, setTitle] = useState("Saturday morning walk")
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
  const [hostId, setHostId] = useState()
  const [latitude, setLatitude] = useState(52.382534)
  const [longitude, setLongitude] = useState(4.913762)
  const [activityTypeId, setActivityType] = useState(1)
  const [startingTime, setStartingTime] = useState(moment().format("HH:mm")) // how does this translate to backend? ==> should we use Time scalar?
  const [isPrivate, setIsPrivate] = useState(false)
  const toggleSwitch = () => setIsPrivate((previousState) => !previousState)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (
      !title ||
      !date ||
      !latitude ||
      !longitude ||
      !activityTypeId ||
      !startingTime
    ) {
      setMessage("Please fill in all the required fields")
    }
    try {
      console.log(
        "arguments passed:",
        title,
        typeof title,
        date,
        typeof date,
        hostId,
        typeof hostId,
        latitude,
        typeof latitude,
        longitude,
        typeof longitude,
        activityTypeId,
        typeof activityTypeId,
        startingTime,
        typeof startingTime,
        isPrivate,
        typeof isPrivate
      )
      await createActivity({
        variables: {
          title,
          date,
          hostId,
          latitude,
          longitude,
          activityTypeId,
          isPrivate,
          startingTime,
        },
      })
      console.log("RESPONSE:", response)
      setMessage("Activity created!")
      if (errorCreateActivity) {
        setMessage("Couldn't create activity")
        console.log("Error@createActivity request:", errorCreateActivity)
      }
      console.log("CreateActivity response:", responseActivity)
    } catch (e) {
      console.log("Caught error:", e)
    }
  }

  /**
   * Conditionals
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

  /**
   * Logs
   */
  // console.log(
  //   "current user in create activity:",
  //   parseInt(currentUser.currentUser.id)
  // )
  // console.log("activityTypes:", data.allActivityTypes)
  // console.log("Host:", typeof hostId, "Date:", date, typeof date)

  /**
   * Screen output
   */
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>{message}</Text>
        <TextInput
          placeholder="Saturday morning walk, 9h, WP"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <View key="DateTimePicker">
          <Button onPress={showDatepicker} title="Show date picker!">
            Select date
          </Button>
          <Button onPress={showTimepicker} title="Show time picker!">
            Pick a starting time
          </Button>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <>
          <Text>Select location:</Text>
          <IconButton icon="map" size={20} onPress={showModal} />
        </>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.mapContainer}
          >
            <MapView
              style={styles.map}
              initialRegion={initialRegion}
              // region={region}
              // onRegionChange={(region) => setRegion(region)}
              // moveOnMarkerPress={false}
            >
              <Marker
                key="2"
                title="Location selector"
                draggable
                coordinate={marker}
                onDragEnd={(marker) => setMarker(marker)}
              ></Marker>
            </MapView>
          </Modal>
        </Portal>
        <View>
          <Text>Select the activity type:</Text>
          <Picker
            selectedValue={activityTypeId}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) =>
              setActivityType(parseInt(itemValue))
            }
          >
            <Picker.Item key="any" label="Any" value="Any" />
            {data.allActivityTypes.map((type) => (
              <Picker.Item key={type.id} label={type.name} value={type.id} />
            ))}
          </Picker>
          <Text>{activityTypeId}</Text>
        </View>
        <>
          <Text>This activity is {isPrivate ? "Private" : "Public"}</Text>
          <Switch
            label="Private"
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isPrivate ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isPrivate}
          />
        </>
        {/* <View>
          <Text>Starting time: {startingTime}</Text>
        </View> */}
        <Button title="Create activity" onPress={submitHandler}>
          Create activity
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  form: {},
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  map: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    ...StyleSheet.absoluteFillObject,

    // flex: 1,
  },
})
