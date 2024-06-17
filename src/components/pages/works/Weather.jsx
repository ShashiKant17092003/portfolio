import { useEffect, useState } from 'react';
import './weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';
import Clock from './clock.jsx';


const Weather = () => {
    const [location,setLocation] = useState('');
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const [weatherData, setWeatherData] = useState({
        location: '...',
        temperature: '...',
        windSpeed: '...',
        humidity: '...',
        icons: '...',
        description: '...',
        temp_min: '...',
        temp_max: '...',
        temp_feel: '...',
        sun_rise: '...',
        sun_set: '...',
        visibility: '...',
        cloud: '...',
    });
    
  const api = '03811e0806fd73321f2af50157894ce6';

  const localTime = (time) =>{
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    } else {
      console.log('Geolocation is not available in your browser.');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let url;
      if (position.latitude !== null && position.longitude !== null) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${api}&units=metric`;
      } else {

        url = `https://api.openweathermap.org/data/2.5/weather?q=Kanpur&appid=${api}&units=metric&set="2022-08-30T17:57:28"`;
      }

      try {
        let response = await fetch(url);
        let data = await response.json();
        setWeatherData({
          location: data.name,
          temperature: (data.main.temp) +"°C",
          windSpeed: data.wind.speed +" km/h",
          humidity: data.main.humidity +" %",
          icons: data.weather[0].icon,
          description: data.weather[0].description,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          temp_feel: data.main.feels_like,
          sun_rise: localTime(data.sys.sunrise)+'hr',
          sun_set: localTime(data.sys.sunset)+'hr',
          visibility: data.visibility,
          cloud: data.clouds.all,
        });
        
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
    
  }, [position]);
  
  const handleSearch = async () => {
    const locationInput = location;

    if (locationInput === '') {
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${api}&units=metric`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeatherData({
        location: data.name,
        temperature: (data.main.temp) + "°C",
        windSpeed: data.wind.speed +"km/h",
        humidity: data.main.humidity+"%" ,
        icons: data.weather[0].icon,
        description: data.weather[0].description,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        temp_feel: data.main.feels_like,
        sun_rise: localTime(data.sys.sunrise)+'hr',
        sun_set: localTime(data.sys.sunset)+'hr',
        visibility: data.visibility,
        cloud: data.clouds.all,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  return(
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-bgDark text-blue-500'>
        <h1 className='text-color text-center my-3 text-5xl bg-bgDark'>Weather</h1>
        <div className="search-Box flex shadow rounded-lg overflow-hidden mb-4">
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                <input type='search' name='' value={location} className='outline-none w-full py-1 px-3' onKeyDown={(e)=>{if(e.key==="Enter"){handleSearch()}}} onChange={(e) => setLocation(e.target.value)} placeholder='Enter City' />
            </div>
            <span className='search-icon' onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{background:'none',display:'flex',alignItems:'center',justifyContent:'center'}} />
            </span>
        </div>
        <div className='element-result'>
            <div className='weather-temprature-icon'>
                <div className="T-data">
                    <div className="temprature-info T-icon-data">
                        <img src ={`http://openweathermap.org/img/w/${weatherData.icons}.png`} alt="wthr img" style={{background:'none',marginTop:'-15px'}}  />
                        <div className='T-desc'>{weatherData.description}</div>
                    </div>
                    <div className="temprature-info T-data-desc">
                        <div className='weather-temprature '>{weatherData.temperature}</div>
                        <div className='T-desc-2'>{weatherData.location}</div>

                    </div>
                </div>
                {/* <div className="temp-icon">
                </div> */}
                {/* <div className="temp-loca">
                </div> */}
            </div>
        
            <div className="weather-info">
                <div className="temp-data temp-min">min: {weatherData.temp_min}</div>
                <div className="temp-data temp-max">max: {weatherData.temp_max}</div>
                <div className="temp-data feels-like">Feels like: {weatherData.temp_feel}</div>
            </div>
            
            <div className='weather-other'>
            <div className='other'>
                <div className='other-icon'>
                    <FontAwesomeIcon icon={faWind} style={{background:'none'}} />
                </div>
                <div className='temp-data other-data'>
                <div className='temp-data wind other-text'>wind speed</div>
                <div className='temp-data wind-speed other-text'>{weatherData.windSpeed}</div>
                </div>
            </div>
            <div className='other'>
                <div className='temp-data other-icon'>
                    <FontAwesomeIcon icon={faDroplet} style={{background:'none'}} />
                </div>
                <div className='temp-data other-data'>
                <div className='temp-data humidity other-text'>Humidity</div>
                <div className='temp-data humidity-amount other-text'>{weatherData.humidity}</div>
                </div>
            </div>
            </div>
            <div className="temp-data sun-info">
                <div className="sun">
                    <div className="temp-data sun-rise">sunrise: {weatherData.sun_rise}</div>
                    <div className="temp-data visibility">visibility: {weatherData.visibility}</div>
                </div>
                <div className="sun">
                    <div className="temp-data sun-set">sunset: {weatherData.sun_set}</div>
                    <div className="temp-data clouds">clouds: {weatherData.cloud}</div>
                </div>
            </div>
            <div className="clock"><Clock /></div>
      </div>
    </div>
  )
}

export default Weather
