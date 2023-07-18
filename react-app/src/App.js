import { useEffect, useState } from "react";
import "./App.css";

const backendHostUrl = 'https://robert1cabrera-obscure-space-journey-jrr9gq7jvwqh57g9-5001.preview.app.github.dev'

const date = new Date(); 
function App() {
  const [location, setLocation] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [lowTemp, setLowTemp] = useState(0);
  const [highTemp, setHighTemp] = useState(0);
  const [icon, setIcon] = useState('');
  const [condition, setCondition] = useState('');
  const [hours, setHours] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    (async () => {

      try {

        const res = await fetch(
          `${backendHostUrl}/geeks-firebase-72e6d/us-central1/getDayWeather`
        );

        const data = await res.json();

        console.log(data);
        setLocation(data.data.location.name)
        setCurrentTemp(data.data.current.temp_f);
        setLowTemp(data.data.forecast.forecastday[0].day.mintemp_f);
        setHighTemp(data.data.forecast.forecastday[0].day.maxtemp_f);
        setIcon(data.data.current.condition.icon);
        setCondition(data.data.forecast.forecastday[0].day.condition.text);
        setHours(data.data.forecast.forecastday[0].hour);
        setDataLoaded(true)

        console.log("The res: ", data.data);
      }
      catch (e) {
        console.error(e);
      }
    })();
  }, []);
  if (!dataLoaded) return <p> ... Loading</p>
  return (
    <div className="App">
      <h1 className="city"> {location} </h1>
      <h2 className="temp">{currentTemp}°</h2>
      <h3 className="condit">{condition}</h3>
      <h3 className="low-high">L:{lowTemp} ˚  H:{highTemp} ˚</h3>
      <div className="hour-cast">
        <h5>🕑HOURLY FORECAST</h5>
        <img src={icon} alt="weather icon" width="50" height="60" />
        <div className="hours">
          {hours.map((hour) => (
            <div>
              {!!hour.now && "now"}
              {hour.formatted_time}
             
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;