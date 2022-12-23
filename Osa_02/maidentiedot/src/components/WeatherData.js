import { useEffect, useState } from "react";
import axios from 'axios'

const WeatherData = ({ city }) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const capitalCity = city[0]
    const [weather, setWeather] = useState([])
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&units=metric&APPID=${apiKey}`
    useEffect(() => {
        axios
            .get(url)
            .then((response) => {setWeather(response.data)})
    }, [url])

    const temperature = weather?.main?.temp
    const feelsLike = weather?.main?.feels_like
    const wind = weather?.wind?.speed
    const humidity = weather?.main?.humidity
    const description = weather?.weather?.[0].description
    const icon = weather?.weather?.[0].icon
    
    return(
      <div>
        <h3>The weather in {city} right now: {description}</h3>
        {icon !== undefined && <img
        src={'http://openweathermap.org/img/wn/' + icon + '@4x.png'}
        alt='weather icon'
        />}
        <p>Temperature: {' '}  {temperature} °C ( feels like {feelsLike} °C)</p>
        <p>Wind: {' '} {wind} m/s </p>
        <p> Humidity: {' '} {humidity} % </p>
      </div>
    )
}
export default WeatherData