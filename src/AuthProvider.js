import React, { createContext, useState } from "react"
import { View, Text } from "react-native"

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [Login, { data }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      AsyncStorage.setItem("token", data.login)
      isSignedInVar(true)
    },
  })



  return <AuthContext.Provider value={{
    user,
    login: () => {
      try {
        await Login({ variables: { email: email, password: password } })
      } catch (e) {
        console.log("error:", e)
      }
      
    },
    logout: () => {
      asy
    }
  }}>
{children}
  </AuthContext.Provider>
}


  const logout = async () => {
    await AsyncStorage.removeItem("token")
    isSignedInVar(false)
  }



  const handleLogin = async (e) => {
  }