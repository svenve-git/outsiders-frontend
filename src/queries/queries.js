/** Overview of the queries to be passed through Apollo Client to the GraphQL API */
import { gql } from "@apollo/client"

export const FETCH_ACTIVITIES = gql`
  query FetchActivities {
    allActivities {
      id
      title
      date
    }
  }
`
export const FETCH_ACTIVITYTYPES = gql`
  query FetchActivityTypes {
    allActivitytypes {
      name
    }
  }
`
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
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
    ) {
      token
      user {
        id
      }
    }
  }
`

/***
 * Example from Apollo Client Documentation @ https://www.apollographql.com/docs/react/data/mutations/
 * 
 ***

  import { gql, useMutation } from '@apollo/client';

  const ADD_TODO = gql`
    mutation AddTodo($type: String!) {
      addTodo(type: $type) {
        id
        type
      }
    }
  `;

 */
