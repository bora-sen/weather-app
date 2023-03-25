import axios from "axios"
import cityLocations from "./cityLocations.json"
import * as WeatherIcons from "../Assets/WeatherIcons"
import { toast } from "react-hot-toast"

export default function useWeather() {
  function getLocation(cityName) {
    try {
      const sel_city = cityLocations.find((inp) => {
        return inp.city.toLocaleLowerCase() === cityName.toLocaleLowerCase()
      })
      const loc = { lat: sel_city.lat, lng: sel_city.lng }
      toast.success("Hava Durumu Güncellendi")
      return loc
    } catch (error) {
      if (error.message === "sel_city is undefined") {
        toast.error("Girilen Şehir Bulunamadı")
      }
    }
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
      title: "Açık",
      icon: WeatherIcons.Clear,
    },
    {
      codes: [45, 48],
      title: "Sisli",
      icon: WeatherIcons.Foggy,
    },
    {
      codes: [51, 52, 53],
      title: "Drizzle Light",
      icon: WeatherIcons.Clear,
    },
    {
      codes: [56, 57],
      title: "Freezing Drizzle",
      icon: WeatherIcons.Cloudy,
    },
    {
      codes: [61, 63, 65],
      title: "Yağmurlu",
      icon: WeatherIcons.Rain,
    },
    {
      codes: [66, 67],
      title: "Freezing Rainy",
      icon: WeatherIcons.Snow,
    },
    {
      codes: [71, 73, 75],
      title: "Kar Yağışlı",
      icon: WeatherIcons.Snow,
    },
    {
      codes: [77],
      title: "Hafif Kar Yağışlı",
      icon: WeatherIcons.Snow,
    },
    {
      codes: [80, 81, 82],
      title: "Sağanak Yağmurlu",
      icon: WeatherIcons.RainShowers,
    },
    {
      codes: [85, 86],
      title: "Sağanak Kar Yağışlı",
      icon: WeatherIcons.Snow,
    },
    {
      codes: [95, 96, 99],
      title: "Fırtınalı",
      icon: WeatherIcons.Storm,
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
        time: "Bugün",
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
