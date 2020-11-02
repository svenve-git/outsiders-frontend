import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import AsyncStorage from "@react-native-community/async-storage"
import { DefaultTheme } from "react-native-paper"

export const isSignedInVar = makeVar()

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isSignedIn: {
          read() {
            return isSignedInVar()
          },
        },
      },
    },
  },
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem("token")

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

export const client = new ApolloClient({
  cache: cache,
  link: authLink.concat(
    createHttpLink({ uri: "http://192.168.178.18:4000/graphql" })
  ),
})

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF521B",
    accent: "#ACE4AA",
  },
}
