import React, { useState } from "react"
import { View, StyleSheet, Picker } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { FontAwesome5 } from "@expo/vector-icons"
import { useMutation, useQuery } from "@apollo/client"
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
  FAB,
  Headline,
} from "react-native-paper"
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"

/**
 * To do:
 * Fix date
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

  // console.log("Marker location:", marker)

  /**
   *    DateTimePicker
   */

  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios") // <---------- Double check in the docs if this is a legitimate value
    setDate(currentDate)
    // setDate(moment(selectedDate).format("YYYY-MM-DD"))
    // setStartingTime(moment(selectedDate).format("HH:mm"))
    // console.log("selected date:", currentDate, "start time:", startingTime)
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
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("") // needs to be implemented
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
  const [hostId, setHostId] = useState()
  const [latitude, setLatitude] = useState(52.382534)
  const [longitude, setLongitude] = useState(4.913762)
  const [activityTypeId, setActivityType] = useState(1)
  const [startingTime, setStartingTime] = useState(moment().format("HH:mm")) // how does this translate to backend? ==> should we use Time scalar?
  const [isPrivate, setIsPrivate] = useState(false)
  const toggleSwitch = () => setIsPrivate((previousState) => !previousState)
  const [selectedValue, setSelectedValue] = useState("Any")

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
      // console.log("RESPONSE:", response)
      // if (errorCreateActivity) {
      // setMessage("Couldn't create activity")
      // console.log("Error@createActivity request:", errorCreateActivity)
      // } else {
      setMessage("Activity created!")
      console.log("CreateActivity response:", responseActivity)
      // }
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
      {message === "Activity created!" ? (
        <Headline style={{ backgroundColor: "#ACE4AA", padding: 20 }}>
          {message}
        </Headline>
      ) : null}
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={(text) => setTitle(text)}
      />
      <View key="DateTimePicker">
        <Button style={styles.button} onPress={showDatepicker}>
          Select a date
        </Button>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: "5%",
          marginTop: "5%",
        }}
      >
        <Text>Location:</Text>
        <IconButton icon="target" size={25} onPress={showModal} />
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.mapContainer}
        >
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            onRegionChangeComplete={(region) => {
              setLatitude(region.latitude)
              setLongitude(region.longitude)
            }}
          ></MapView>
          <FontAwesome5
            name="map-pin"
            size={35}
            color="#FF521B"
            style={styles.marker}
          />
          <FAB
            style={{ marginTop: "90%", backgroundColor: "#FF521B" }}
            label="Select"
            onPress={hideModal}
          />
        </Modal>
      </Portal>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "nowrap",
          marginHorizontal: "5%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Type:</Text>
        <Picker
          selectedValue={selectedValue}
          style={{ width: "60%" }}
          onValueChange={(itemValue, itemIndex) => {
            console.log("value:", itemValue, "index:", itemIndex)
            setActivityType(itemIndex)
            setSelectedValue(itemValue)
          }}
        >
          <Picker.Item key="any" label="Any" value="Any" />
          {data.allActivityTypes.map((type) => (
            <Picker.Item key={type.id} label={type.name} value={type.name} />
          ))}
        </Picker>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "5%",
        }}
      >
        <Text>
          This activity is{" "}
          {isPrivate ? "private (invitation needed)" : "public"}
        </Text>
        <Switch
          label="Private"
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isPrivate ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isPrivate}
        />
      </View>
      {/* <View>
          <Text>Starting time: {startingTime}</Text>
        </View> */}
      <Button style={styles.button} onPress={() => {}}>
        Invite friends
      </Button>
      <Button style={styles.button} onPress={submitHandler}>
        Create activity
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  form: {},
  input: {
    backgroundColor: "white",
    marginTop: "5%",
  },
  button: {
    marginTop: "5%",
  },
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
  marker: {
    left: "50%",
    marginLeft: -10,
    marginTop: -28,
    position: "absolute",
    top: "50%",
  },
})
