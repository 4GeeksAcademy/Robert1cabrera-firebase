const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const axios = require("axios");
const cors = require("cors")({ origin: true });
require("dotenv").config();



function formatHourTime(hour) {

  const unformattedTime = hour.time;

  const numericTime = Number(hour.time.slice(11, 13));
  let formattedTime = "";

  if (numericTime >= 0 && numericTime <= 11) {
    formattedTime = `${numericTime} AM`;
  }
  else {
    const pmTime = numericTime - 12 === 0 ? 12 : numericTime - 12;
    formattedTime = `${pmTime} PM`;
  }

  return formattedTime;
}

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.getDayWeather = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const response = {
      status: 200,
      data: {},
      msg: "Successfully gathered weather data!",
    };

    const { WEATHER_API_KEY } = process.env;

    try {
      const { data } = await axios(
        `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=Miami&days=1&aqi=no&alerts=no`
      );

      const hours = data.forecast.forecastday[0].hour;

      for (let i = 0; i < hours.length; i ++) {
        const hour = hours[i];

        hour.formatted_time = formatHourTime(hour);
      }

      response.data = data;
    } catch (e) {
      response.status = 500;
      response.msg = e.message;
    }

    res.status(response.status).send(response);
  });
});
