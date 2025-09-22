import express from "express"
import cors from "cors"
import fetch from "node-fetch"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend attivo!")
})

app.post("/api/recipes", async (req, res) => {
  try {
    const { ingredients } = req.body
    console.log("Ingredienti ricevuti dal frontend:", ingredients)

    const spoonResponse = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${
        process.env.SPOONACULAR_KEY
      }&ingredients=${ingredients.join(",")}&number=15`
    )

    if (spoonResponse.status === 402) {
      return res.status(402).json({
        error: "Limite giornaliero di ricette raggiunto. Riprova domani.",
      })
    }

    if (!spoonResponse.ok) {
      throw new Error(`Errore Spoonacular: ${spoonResponse.status}`)
    }

    const recipes = await spoonResponse.json()
    console.log("Risposta Spoonacular:", recipes)

    res.json(recipes)
  } catch (err) {
    console.error("Errore backend:", err)
    res.status(500).json({ error: "Errore nella ricerca delle ricette" })
  }
})

// Avvio server
app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001")
})
