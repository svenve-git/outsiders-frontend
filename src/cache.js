import { InMemoryCache, makeVar } from "@apollo/client"

export const isSignedInVar = makeVar()

export const cache = new InMemoryCache({
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
