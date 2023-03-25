import axios from "axios"
import cityLocations from "./cityLocations.json"
import * as WeatherIcons from "../Assets/WeatherIcons"

export default function useWeather() {
  function getLocation(cityName) {
    const sel_city = cityLocations.find((inp) => {
      return inp.city.toUpperCase() === cityName.toUpperCase()
    })
    const loc = { lat: sel_city.lat, lng: sel_city.lng }
    return loc
  }

  function calculateDaily(dateArr, weatherCodeArr) {
    const chartArr = []
    dateArr.forEach((date, index) => {
      chartArr.push({
        date,
        weatherCode: weatherCodeArr[index],
      })
    })
  }

  const weatherCodes = [
    {
      codes: [0, 1, 2, 3],
      title: "Clear Sky",
      icon: WeatherIcons.CloudyDay,
    },
    {
      codes: [45, 48],
      title: "Foggy",
      icon: WeatherIcons.Foggy,
    },
    {
      codes: [51, 52, 53],
      title: "Drizzle Light",
      icon: WeatherIcons.SunnyDay,
    },
    {
      codes: [56, 57],
      title: "Freezing Drizzle",
      icon: WeatherIcons.CloudyDay,
    },
    {
      codes: [61, 63, 65],
      title: "Rainy",
      icon: WeatherIcons.Stormy,
    },
    {
      codes: [66, 67],
      title: "Freezing Rainy",
      icon: WeatherIcons.SunnyDay,
    },
    {
      codes: [71, 73, 75],
      title: "Snow Fall",
      icon: WeatherIcons.SunnyDay,
    },
    {
      codes: [77],
      title: "Snow Grains",
      icon: WeatherIcons.SunnyDay,
    },
    {
      codes: [80, 81, 82],
      title: "Rain Showers",
      icon: WeatherIcons.SunnyDay,
    },
    {
      codes: [85, 86],
      title: "Snow Showers",
      icon: WeatherIcons.SunnyDay,
    },
    {
      codes: [95, 96, 99],
      title: "Thunderstorm",
      icon: WeatherIcons.SunnyDay,
    },
  ]

  function weatherCodeToTitle(weatherCode) {
    try {
      const sel_weather = weatherCodes.find((weather) => {
        return weather.codes.includes(weatherCode) === true
      })
      return sel_weather.title
    } catch (error) {
      console.log(error)
    }
  }
  function weatherCodeToIcon(weatherCode) {
    try {
      const sel_weather = weatherCodes.find((weather) => {
        return weather.codes.includes(weatherCode) === true
      })
      return sel_weather.icon
    } catch (error) {
      console.log(error)
    }
  }
  function reverseDate(dateString) {
    return dateString.split("-").reverse().join("/")
  }
  async function getWeather(position) {
    const { lat, lng } = position
    const resp = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&daily=weathercode,temperature_2m_min&current_weather=true&timezone=Europe%2FBerlin`
    )

    const weather = resp.data
    const currentWeather = weather.current_weather
    const daily = weather.daily
    const dailyArr = []

    daily.time.forEach((time, index) => {
      dailyArr.push({
        time: reverseDate(time),
        temperature: daily.temperature_2m_min[index],
        weathercode: daily.weathercode[index],
      })
    })

    const newWeather = {
      today: {
        time:"Today",
        temperature: currentWeather.temperature,
        weathercode: currentWeather.weathercode,
      },
      daily: dailyArr,
    }
    //console.log(newWeather);
    return newWeather
  }

  return { getLocation, getWeather, calculateDaily, weatherCodeToTitle, weatherCodes, weatherCodeToIcon }
}
