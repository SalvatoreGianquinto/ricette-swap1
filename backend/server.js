import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const SPOONACULAR_KEY = process.env.SPOONACULAR_KEY

app.post("/api/recipes", async (req, res) => {
  try {
    const { ingredients } = req.body
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${SPOONACULAR_KEY}&ingredients=${ingredients.join(
        ","
      )}&number=10`
    )
    const data = await response.json()
    res.json(Array.isArray(data) ? data : [])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Errore nella ricerca delle ricette" })
  }
})

app.listen(3001, () => console.log("Server running on port 3001"))
