import { createContext, useContext, useState } from "react"
import pb from "/pb"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const updateUser = async (userId, formData) => {
    const updatedUser = await pb.collection("users").update(userId, formData)
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
