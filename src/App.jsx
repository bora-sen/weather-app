import { useState } from "react"
import { toast } from "react-hot-toast"
import WeatherCard from "./Components/WeatherCard"
import useWeather from "./Hooks/useWeather"
import MainLayout from "./Layouts/MainLayout"
import ThemeSwitcher from "./Components/ThemeSwitcher"

function App() {
  const { getLocation, getWeather } = useWeather()
  const [weather, setWeather] = useState(false)

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      const cityName = document.querySelector("#location_input").value
      if (cityName !== "") {
        const location = await getLocation(cityName)
        const weather = await getWeather(location)
        setWeather(weather)
        document.getElementById("location_input").value = ""
      }
    } catch (error) {
      toast.error("Girilen Şehir Bulunamadı")
      document.getElementById("location_input").value = ""
    }
  }

  return (
    <MainLayout>
      <section>
        <ThemeSwitcher />
        <form onSubmit={(e) => handleSubmit(e)} className="grid w-full sm:w-[24rem] mx-auto font-bold text-lg text-center text-white gap-2">
          <span>Şehir</span>
          <input
            placeholder="Şehir Giriniz"
            id="location_input"
            className="glass-morph p-4 outline-none text-white dark:text-gray-200 dark:placeholder:text-gray-500 placeholder:text-white placeholder:text-opacity-70"
            type="text"
          />
          <button className="text-white dark:text-gray-200 outline-dashed mt-2 py-4 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-colors">
            Hava Durumunu Öğren
          </button>
        </form>
        {weather && (
          <div>
            <div className="p-4 mt-12 mb-24 flex gap-y-8 items-center justify-center">
              <WeatherCard weather={weather.today} />
            </div>
            <div className="p-4 my-12 flex flex-wrap md:flex-row lg:w-[78rem] gap-8 items-center justify-center">
              {weather.daily.map((weather, index) => {
                return <WeatherCard key={index} weather={weather} />
              })}
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  )
}

export default App
