import { useState } from "react"
import { GiCook } from "react-icons/gi"

const Homepage = function () {
  const [ingredient, setIngredient] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])

  const addIngredient = () => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient])
      setIngredient("")
    }
  }

  const removeIngredient = (ing) => {
    setIngredients(ingredients.filter((i) => i !== ing))
  }

  const searchRecipes = async () => {
    if (ingredients.length === 0) return
    try {
      const response = await fetch("http://localhost:3001/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      })
      const data = await response.json()
      console.log("Dati ricevuti dal server:", data)
      setRecipes(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Errore nel fetch:", err)
      setRecipes([])
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="mb-10">
        <svg width="500" height="150" viewBox="0 0 500 80">
          <path id="curve" fill="transparent" d="M10,100 Q250,0 490,100" />
          <text fill="#ef4444" fontSize="48" fontWeight="bold">
            <textPath href="#curve" startOffset="50%" textAnchor="middle">
              Ricette-Swap
            </textPath>
          </text>
        </svg>
      </div>

      <div className="w-full md:w-1/2 bg-white backdrop-blur-md p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Non sai cosa cucinare?</h2>
        <p className="flex items-center mb-3">
          <GiCook className="mr-2" /> Scegli gli ingredienti che hai
        </p>
        <p className="flex items-center mb-3">
          <GiCook className="mr-2" /> Trova la ricetta giusta per te
        </p>
        <p className="flex items-center">
          <GiCook className="mr-2" /> Salva le tue ricette preferite (solo
          registrati)
        </p>
      </div>

      <div className="flex flex-col items-center mb-6 w-full max-w-xl mt-10">
        <div className="flex w-full mb-2">
          <input
            type="text"
            placeholder="Inserisci un ingrediente"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="flex-1 p-2 border rounded-l"
          />
          <button
            type="button"
            onClick={addIngredient}
            className="bg-green-500 text-white px-4 rounded-r hover:bg-green-600"
          >
            Aggiungi
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {ingredients.map((ing, i) => (
            <span
              key={i}
              className="bg-gray-200 px-3 py-1 rounded flex items-center"
            >
              {ing}
              <button
                onClick={() => removeIngredient(ing)}
                className="ml-2 text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={searchRecipes}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
        >
          Cerca Ricette
        </button>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(recipes) && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded shadow p-4 flex flex-col items-center"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-bold text-lg text-center">{recipe.title}</h3>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">
            {ingredients.length === 0
              ? "Inserisci gli ingredienti e premi 'Cerca Ricette'."
              : "Nessuna ricetta trovata."}
          </p>
        )}
      </div>
    </div>
  )
}

export default Homepage
