import { useState } from "react"
import pb from "/pb"
import { useAuth } from "../context/AuthContent"
import { Link, useNavigate } from "react-router-dom"
import { GiCook } from "react-icons/gi"
import Toast from "./Toast"

const Register = function () {
  const { login } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (password !== passwordConfirm) {
      setError("Le password non corrispondono")
      return
    }
    try {
      const username = email.split("@")[0]
      const record = await pb.collection("users").create({
        email,
        password,
        passwordConfirm: password,
        name,
        username,
      })
      console.log("Record creato:", record)

      const authData = await pb
        .collection("users")
        .authWithPassword(username, password)
      console.log("Login riuscito:", authData)

      login(authData.record)
      setError("")
      setToast({ message: "Registrazione effettuata!", type: "success" })
      setTimeout(() => navigate("/login"), 1000)
    } catch (err) {
      console.error("Errore PocketBase:", err)
      setError(err.message || "Errore nella registrazione")
      setToast({ message: "Errore registrazione!", type: "error" })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div
      className="w-full h-screen bg-cover bg-norepeat flex justify-center items-center min-h-screen bg-gray-100"
      style={{ backgroundImage: "url('sfondo.jpg')" }}
    >
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm max-v-md ml-4"
      >
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="flex justify-center">
          <svg width="400" height="120" viewBox="0 0 400 150">
            <path id="curve" fill="transparent" d="M10,100 Q200,0 390,100" />
            <text fill="#ef4444" fontSize="36" fontWeight="bold">
              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                Ricette-Swap
              </textPath>
            </text>
          </svg>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Conferma Password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          disabled={loading}
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Registrazione in corso..." : "Registrati"}
        </button>

        <p className="mt-3">
          Hai già un account?
          <Link to="/login" className="text-green-500">
            {" "}
            Accedi qui{" "}
          </Link>
        </p>
      </form>

      <div className="w-full md:w-1/4 flex justify-start items-center ml-10 flex-col hidden md:block backdrop-blur-md p-10 rounded font-bold font-sans">
        <h2 className="text-2xl">Non sai cosa cucinare?</h2>
        <p className="flex items-center mt-5">
          <GiCook className="mr-2" />
          Scegli gli ingredienti
        </p>
        <p className="flex items-center mt-5">
          <GiCook className="mr-2" /> Trova la ricetta per te
        </p>
      </div>
    </div>
  )
}

export default Register
