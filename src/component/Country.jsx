import {React,useEffect,useState} from 'react'
import axios from 'axios'


function Country({name}) {
    const [capital, setCapital] = useState(null); // React state for capital
    const [area, setArea] = useState(null); // State for area
    const [languages, setLanguages] = useState(null); // State for languages
    const [image, setImage] = useState(null); // State for languages
    const [latlng,setLatlng] = useState(null)
    const [weather,setWeather] = useState(null)
    // https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}
    const api_key = "b6160e5d788fb565f734837fc13a6159"
    // import.meta.env.VITE_WEATHER_KEY
    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
    const nameCount = name.slice(0,1).toUpperCase()+name.slice(1);

    const urlForecast = latlng ? `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}` : ''
    console.log(api_key)
    useEffect(()=>{
        axios.get(url)
        .then(response => response.data)
        .then(country => {
            setCapital(country.capital)
            setArea(country.area)
            setLanguages(Object.values(country.languages))
            setImage(country.flags.png)
            setLatlng(country.latlng)
        }
        ) 
    },[url])     
    useEffect(()=>{
        if(latlng){
        axios.get(urlForecast)
             .then(response => response.data)
             .then(weather => {               
                setWeather(weather)
             })
            }
    },[latlng])
    

    if(!capital || !latlng) return null     
    if(!weather) return null         
  return (
    <div>
        <h1>{nameCount}</h1>
        <div>
            <p>Capital {capital}</p>
            <p>Area {area}</p>
        </div>
        <h2>languages:</h2>
        <ul>
            {languages.map(language => {
                return (
                    <li>{language}</li>
                )
            })}
        </ul>
        <img src={image} />
        <h2>{nameCount}</h2>
        <p>Temperature {(weather.main.temp - 273.15).toFixed(2)} °C</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Country