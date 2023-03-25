import React from "react"
import { Toaster } from "react-hot-toast"
import ThemeSwitcher from "../../Components/ThemeSwitcher"

function MainLayout({ children }) {
  return (
    <main>
      <Toaster />
      <section className="w-full min-h-screen transition-all flex justify-center pt-12 bg-main-light dark:bg-main-dark bg-center bg-cover">{children}</section>
    </main>
  )
}

export default MainLayout
