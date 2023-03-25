import React, { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [Theme, setTheme] = useState("light")

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark")
    } else if (localStorage.getItem("theme") === "dark") {
      setTheme("light")
    }
  }, [])

  useEffect(() => {
    if (Theme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (Theme === "light") {
      document.documentElement.classList.remove("dark")
    }
  }, [Theme])

  function changeThemeToDark() {
    localStorage.setItem("theme", "dark")
    setTheme("dark")
  }
  function changeThemeToLight() {
    localStorage.setItem("theme", "light")
    setTheme("light")
  }

  const data = {
    Theme,
    changeThemeToDark,
    changeThemeToLight,
  }

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
}
export default ThemeProvider
