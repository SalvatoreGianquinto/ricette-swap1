import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Layout from "./components/Layout"
import Homepage from "./components/Homepage"

function App() {
  const user = null
  const logout = () => console.log("logout")
  return (
    <BrowserRouter>
      <Layout user={user} logout={logout}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
