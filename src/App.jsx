import { useRef } from 'react'
import wind from './assests/wind.png'
import humidity from './assests/humidity.png'
import './App.css'
import { useState } from 'react'

function App() {

  const [data, setData] = useState({ box: false })

  let getCityName = useRef()

  const getData = async (e, city) => {
    e.preventDefault()
    if (city === "") {
      return alert("Enter City Name...")
    }
    const apiKey = '3e4a5509a0e1932b33a74228ea0c0791';
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setData({
          box: true,
          name: data.name,
          temp: Math.floor(data.main.temp),
          wind: data.wind.speed,
          humidity: data.main.humidity,
          haze: data.weather[0].main
        })
      })
      .catch(e => console.log(e.message))
  }

  return (
    <>
      <section className='container'>
        <form>
          <input type="text" placeholder='Enter City' ref={getCityName} />
          <button onClick={(e) => getData(e, getCityName.current.value)} type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
        {
          data.box ?
            <div className="data-container">
              <div className="box">
                <p>{data.name}</p>
              </div>
              <div className="tem">
                <p>{data.temp}°C</p>
                <span>{data.haze}</span>
              </div>
              <div className="box">
                <div className="sub-box">
                  <div>
                    <img src={wind} alt="" />
                    <p>{data.wind}</p>
                  </div>
                  <p>Wind</p>
                </div>
                <div className="sub-box">
                  <div>
                    <img src={humidity} alt="" />
                    <p>{data.humidity}</p>
                  </div>
                  <p>Humidity</p>
                </div>
              </div>
            </div> : <></>
        }
      </section>
    </>
  )
}

export default App