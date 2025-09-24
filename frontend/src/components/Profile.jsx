import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContent"
import pb from "/pb"

const Profile = function () {
  const { user, setUser } = useAuth()
  const { removeFavorite } = useAuth()
  const navigate = useNavigate()
  const [setAvatarFile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) navigate("/login")
  }, [user, navigate])

  if (!user) return null

  const avatarUrl = user.avatar
    ? `http://127.0.0.1:8090/api/files/users/${user.id}/${user.avatar}`
    : null

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("avatar", file)

      const updatedUser = await pb.collection("users").update(user.id, formData)
      setUser(updatedUser)
      setAvatarFile(file)
    } catch (err) {
      console.error("Errore upload avatar:", err)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await pb.authStore.clear()
    setUser(null)
    navigate("/login")
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="mb-4">
        <img
          src={avatarUrl || "/placeholder-avatar.png"}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover mb-2 ms-20"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          disabled={loading}
          className="mt-2"
        />
      </div>

      <h2 className="text-3xl font-bold mb-4">
        Benvenuto nel tuo profilo {user.name || user.username}
      </h2>
      <h2 className="text-3xl font-bold mb-4">Ricette salvate:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.favoriteRecipes?.map((r) => (
          <Link key={r.id} to={`/recipe/${r.id}`}>
            <div className="p-4 border rounded shadow bg-white hover:shadow-lg cursor-pointer transition">
              <img
                src={r.image}
                alt={r.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold text-center">{r.title}</h3>
              <button
                onClick={(e) => {
                  e.preventDefault() // per evitare che il link venga attivato
                  removeFavorite(r.id)
                }}
                className="text-red-500 mt-2 block mx-auto"
              >
                Rimuovi
              </button>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-3"
      >
        Logout
      </button>
    </div>
  )
}

export default Profile
