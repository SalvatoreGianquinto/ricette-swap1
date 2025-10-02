import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContent"

const RecipeDetail = function () {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user, addFavorite, removeFavorite } = useAuth()
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const isFavorite =
    user && recipe
      ? user.favoriteRecipes?.some((r) => r.id === recipe.id)
      : false

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${backendUrl}/api/recipes/${id}`)
        if (!res.ok) throw new Error("Errore nel recupero della ricetta")
        const data = await res.json()
        setRecipe(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id, backendUrl])

  if (loading) return <p className="text-center mt-10">Caricamento...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>
  if (!recipe) return null

  return (
    <div className="max-w mx-auto p-4 bg-gradient-to-b from-orange-200 to-white-300 text-center">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover rounded mb-4 mx-auto"
      />
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredienti</h2>
        <ul className="list-disc list-inside">
          {recipe.extendedIngredients?.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Procedimento</h2>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        />
      </div>

      {user && (
        <button
          onClick={() =>
            isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe)
          }
          className={`px-3 py-1 rounded mt-3 ${
            isFavorite
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        </button>
      )}
    </div>
  )
}

export default RecipeDetail
