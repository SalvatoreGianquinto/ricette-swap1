import { createContext, useContext, useState, useEffect } from "react"
import pb from "/pb"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    pb.authStore.clear()
  }

  const updateUser = async (userId, formData) => {
    const updatedUser = await pb.collection("users").update(userId, formData)
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const addFavorite = async (recipe) => {
    if (!user) return

    const favorites = user.favoriteRecipes || []
    if (favorites.some((r) => r.id === recipe.id)) return // già presente

    const updatedUser = await pb.collection("users").update(user.id, {
      favoriteRecipes: [...favorites, recipe],
    })

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const removeFavorite = async (recipeId) => {
    if (!user) return

    const updatedFavorites = (user.favoriteRecipes || []).filter(
      (r) => r.id !== recipeId
    )

    const updatedUser = await pb.collection("users").update(user.id, {
      favoriteRecipes: updatedFavorites,
    })

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
