import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const backendHostUrl = 'https://robert1cabrera-obscure-space-journey-jrr9gq7jvwqh57g9-5001.preview.app.github.dev'

function App() {
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${backendHostUrl}/geeks-firebase-72e6d/us-central1/helloWorld`
      );

      const data = await res.text();

      console.log("The res: ", data);
    })();
  }, []);

  return (
    <div className="app1">
      <div className="container">

      </div>
      
    </div>
  );
}

export default App;
