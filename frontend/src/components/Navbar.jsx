import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContent"

const Navbar = () => {
  const { user, logout } = useAuth()

  const avatarUrl = user?.avatar
    ? `http://127.0.0.1:8090/api/files/users/${user.id}/${user.avatar}`
    : null

  return (
    <nav className="w-full shadow p-4 flex justify-between items-center bg-orange-200">
      <Link to="/" className="text-2xl font-bold text-red-500">
        Ricette-Swap
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-2">
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <Link to="/profile" className="hover:text-green-500">
                <span className="font-semibold">{user.name}</span>
              </Link>
            </div>

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
