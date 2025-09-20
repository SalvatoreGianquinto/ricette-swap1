import { useLocation } from "react-router-dom"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  const location = useLocation()

  const noNavbarRoutes = ["/login", "/register"]

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <main>{children}</main>
    </>
  )
}
export default Layout
