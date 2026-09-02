import { useEffect, useState } from "react"
import axios from "axios"

const App = () => {
  const [allData, setAllData] = useState([])
  const [query, setQuery] = useState("")
  const [options, setOptions] = useState([])
  const [match, setMatch] = useState(null)
  const [complain, setComplain] = useState("")
  const [weatherData, setWeatherData] = useState(null)

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
  const apiKey = import.meta.env.VITE_WEATHER_KEY

  const hook = () => {
    console.log("useEffect Start")
    axios
      .get(`${baseUrl}/all`)
      .then(res => {
        setAllData(res.data)
        return res.data
      })
      .then(data => console.log(data))
  }

  useEffect(hook, [])
  useEffect(() => {
    if (match) {
      axios
        .get(
          `${weatherUrl}?lat=${match.capitalInfo.latlng[0]}&lon=${match.capitalInfo.latlng[1]}&appid=${apiKey}&units=metric`,
        )
        .then(res => {
          setWeatherData(res.data)
          return res.data
        })
        .then(data => console.log(data))
    }
  }, [match])

  const handleChange = event => {
    const searchText = event.target.value.toLowerCase()
    setQuery(searchText)

    if (searchText.length === 0) {
      setMatch(null)
      setOptions([])
      setComplain("")
      return
    }

    const exactMatch = allData.find(
      d => d.name.common.toLowerCase() === searchText,
    )
    const selected = allData.filter(d =>
      d.name.common.toLowerCase().includes(searchText),
    )

    if (exactMatch) {
      setMatch(exactMatch)
      setOptions([])
      setComplain("")
      return
    }

    if (selected.length > 10) {
      setMatch(null)
      setOptions([])
      setComplain("Too many matches, specify another filter")
      return
    }

    if (selected.length > 0) {
      setMatch(null)
      setOptions(selected)
      setComplain("")
      return
    }

    setMatch(null)
    setOptions([])
    setComplain("No matches found")
  }

  const handleShow = o => {
    setMatch(o)
    setOptions([])
    setQuery("")
  }

  return (
    <>
      find countries <input type="text" value={query} onChange={handleChange} />
      {complain && <p>{complain}</p>}
      {query &&
        options.map(o => (
          <p key={o.area}>
            {o.name.common} <button onClick={() => handleShow(o)}>Show</button>
          </p>
        ))}
      {match && (
        <div>
          <h1>{match.name.common}</h1>
          <p>Capital {match.capital.join(", ")}</p>
          <p>Area {match.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.entries(match.languages).map(([short, long]) => (
              <li key={short}>{long}</li>
            ))}
          </ul>
          <img src={match.flags.png} alt={match.flags.alt} />

          <h2>Wheather in {match.capital[0]}</h2>
          {weatherData && (
            <>
              <p>Temperature {weatherData.main.temp} Celcius</p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
              />
              <p>Wind {weatherData.wind.speed} m/s</p>
            </>
          )}
        </div>
      )}
      {/* {match && <pre>{JSON.stringify(match, null, 2)}</pre>} */}
    </>
  )
}
export default App
