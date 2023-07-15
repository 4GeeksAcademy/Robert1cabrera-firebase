import { useEffect, useState } from "react";
import "./App.css";

const backendHostUrl = 'https://robert1cabrera-obscure-space-journey-jrr9gq7jvwqh57g9-5001.preview.app.github.dev'


function App() {
  const [currentTemp, setCurrentTemp] = useState(0);
  const [lowTemp, setLowTemp] = useState(0);
  const [highTemp, setHighTemp] = useState(0);

  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${backendHostUrl}/geeks-firebase-72e6d/us-central1/getDayWeather`
      );

      const data = await res.json();
      setCurrentTemp(data.data.current.temp_f);
      setLowTemp(data.data.forecast.forecastday[0].day.mintemp_f);
      setHighTemp(data.data.forecast.forecastday[0].day.maxtemp_f);
      setDataLoaded(true)

      console.log("The res: ", data.data);
    })();
  }, []);
  if (!dataLoaded) return <p> ... Loading</p>
  return (
    <div className="App">
      <div>
        <h1 className="h1">
          {currentTemp}
        </h1>
        <h2>{lowTemp}</h2>
        <h2>{highTemp}</h2>

      </div>


    </div>
  );
}

export default App;