import { useEffect } from "react"

const Toast = function ({ message, type = "success", onClose }) {
  useEffect(() => {
    // Chiude automaticamente il toast dopo 3 secondi
    const timer = setTimeout(() => onClose(), 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  // Colore di sfondo a seconda del tipo (success o error)
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500"

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded shadow fixed top-5 right-5 z-50`}
    >
      {message}
    </div>
  )
}

export default Toast
