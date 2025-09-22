import { useEffect } from "react"

const Toast = function ({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000)
    return () => clearTimeout(timer)
  }, [onClose])

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
