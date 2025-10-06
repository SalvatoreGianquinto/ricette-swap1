import { createContext, useContext, useState, useEffect } from "react"
import pb from "/pb"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(pb.authStore.model || null)

  useEffect(() => {
    const removeListener = pb.authStore.onChange(() => {
      setUser(pb.authStore.model)
    })

    return () => removeListener()
  }, [])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    pb.authStore.clear()
    setUser(null)
  }

  const updateUser = async (userId, formData) => {
    const updatedUser = await pb.collection("users").update(userId, formData)
    setUser(updatedUser)
  }

  const addFavorite = async (recipe) => {
    if (!user) return
    const favorites = user.favoriteRecipes || []
    if (favorites.some((r) => r.id === recipe.id)) return

    const updatedUser = await pb.collection("users").update(user.id, {
      favoriteRecipes: [...favorites, recipe],
    })
    setUser(updatedUser)
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
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
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
