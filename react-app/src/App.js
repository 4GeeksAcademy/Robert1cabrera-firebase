import { useEffect, useState } from "react";
import "./App.css";

const backendHostUrl = 'https://robert1cabrera-obscure-space-journey-jrr9gq7jvwqh57g9-5001.preview.app.github.dev'


function App() {
  const [location, setLocation] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [lowTemp, setLowTemp] = useState(0);
  const [highTemp, setHighTemp] = useState(0);
  const [icon, setIcon] = useState(0);
  const [condition, setCondition] = useState(0);

  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${backendHostUrl}/geeks-firebase-72e6d/us-central1/getDayWeather`
      );

      const data = await res.json();
      setLocation(data.data.location.name)
      setCurrentTemp(data.data.current.temp_f);
      setLowTemp(data.data.forecast.forecastday[0].day.mintemp_f);
      setHighTemp(data.data.forecast.forecastday[0].day.maxtemp_f);
      setIcon(data.data.current.condition.icon);
      setCondition(data.data.forecast.forecastday[0].day.condition.text);
      setDataLoaded(true)

      console.log("The res: ", data.data);
    })();
  }, []);
  if (!dataLoaded) return <p> ... Loading</p>
  return (
    <div className="App">
      <div>
        <h1 className="city"> {location} </h1>
        <h2 className="temp">{currentTemp}</h2>
        <h3 className="condit">{condition}</h3>
        <h3 className="low-high">L:{lowTemp}  H:{highTemp}</h3>

      </div>
    </div>
  );
}

export default App;