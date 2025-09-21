import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContent"

const Navbar = () => {
  const { user, setUser } = useAuth()

  const logout = () => {
    setUser(null)
  }

  return (
    <nav className="w-full bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-red-500">
        Ricette-Swap
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/profile" className="hover:text-green-500">
              {user.name}
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Registrati
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
