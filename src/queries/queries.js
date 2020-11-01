/** Overview of the queries to be passed through Apollo Client to the GraphQL API */
import { gql } from "@apollo/client"

export const FETCH_10_ACTIVITIES = gql`
  query Fetch10Activities($offset: Int, $limit: Int) {
    tenActivities(offset: $offset, limit: $limit) {
      id
      title
      date
      latitude
      longitude
      startingTime
      isPrivate
      host {
        fullName
      }
    }
  }
`

export const FETCH_ACTIVITIES = gql`
  query FetchActivities {
    allActivities {
      id
      title
      date
      latitude
      longitude
      startingTime
      host {
        fullName
      }
      isPrivate
    }
  }
`

export const FETCH_ACTIVITIES_AND_TYPES = gql`
  query FetchActivitiesAndTypes {
    allActivities {
      id
      title
      date
      startingTime
      latitude
      longitude
      host {
        fullName
      }
      activityType {
        name
      }
    }
    allActivityTypes {
      id
      name
    }
  }
`

export const FETCH_ACTIVITYTYPES = gql`
  query FetchActivityTypes {
    allActivityTypes {
      id
      name
    }
  }
`
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

export const CURRENTUSER = gql`
  query CurrentUser {
    currentUser {
      id
      fullName
      address
    }
  }
`

export const SIGNUP = gql`
  mutation SignUp(
    $fullName: String!
    $email: String!
    $password: String!
    $address: String!
    $gender: String!
  ) {
    signup(
      fullName: $fullName
      email: $email
      password: $password
      address: $address
      gender: $gender
    )
  }
`

export const CREATE_ACTIVITY = gql`
  mutation createActivity(
    $title: String!
    $date: Date!
    $hostId: Int!
    $latitude: Float!
    $longitude: Float!
    $activityTypeId: Int!
    $isPrivate: Boolean!
    $startingTime: String!
  ) {
    createActivity(
      title: $title
      date: $date
      hostId: $hostId
      latitude: $latitude
      longitude: $longitude
      activityTypeId: $activityTypeId
      isPrivate: $isPrivate
      startingTime: $startingTime
    ) {
      title
    }
  }
`
