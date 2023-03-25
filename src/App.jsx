import { useState } from "react"
import WeatherCard from "./Components/WeatherCard"
import useWeather from "./Hooks/useWeather"
import MainLayout from "./Layouts/MainLayout"

function App() {
  const { getLocation, getWeather } = useWeather()
  const [weather, setWeather] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const cityName = document.querySelector("#location_input").value
    const location = await getLocation(cityName)
    const weather = await getWeather(location)
    setWeather(weather)
  }

  return (
    <MainLayout>
      <section>
        <div className="grid w-full sm:w-[24rem] mx-auto font-bold text-lg text-center text-white gap-2">
          <span>Şehir</span>
          <input id="location_input" className="glass-morph p-4 outline-none text-white" type="text" />
          <button
            onClick={(e) => handleSubmit(e)}
            className="text-white outline-dashed mt-2 py-4 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            Hava Durumunu Öğren
          </button>
        </div>
        {weather && (
          <div>
            <div className="p-4 mt-12 mb-24 flex gap-y-8 items-center justify-center">
              <WeatherCard weather={weather.today} />
            </div>
            <div className="p-4 my-12 flex flex-col md:flex-row lg:w-[78rem] gap-8 flex-wrap items-center justify-center">
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
