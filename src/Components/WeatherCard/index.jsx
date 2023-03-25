import React from "react"
import * as WeatherIcons from "../../Assets/WeatherIcons"
import useWeather from "../../Hooks/useWeather"

function WeatherCard({ weather }) {
  const { weatherCodeToTitle, weatherCodeToIcon } = useWeather()
  const { time, temperature, weathercode } = weather
  return (
    <div className="w-[10rem] sm:w-[16rem] glass-morph text-center px-2 py-8 rounded-2xl">
      <div className="w-full my-2">
        <img className="w-[8rem] mx-auto" src={weatherCodeToIcon(weathercode)} alt={`${WeatherIcons.SunnyDay}'s weather icon`} />
      </div>
      <div className="flex flex-col text-white gap-2">
        <span className="font-bold text-xl">{time}</span>
        <span className="font-semibold text-4xl">{`${temperature}°C`}</span>
        <span className="text-base">{weatherCodeToTitle(weathercode)}</span>
      </div>
    </div>
  )
}

export default WeatherCard
