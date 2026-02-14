import axios from "axios";

export const forecast = (latitude, longitude, callBack) => {
  const accessKey = process.env.ACCESS_KEY;
  axios
    .get(
      `https://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}`,
    )
    .then(({ data }) => {
      if (!data.location.name) {
        return callBack("Location is incorrect", undefined);
      }
      const currentWeatherObj = data.current;
      const [weatherDescription] = currentWeatherObj.weather_descriptions;
      const temperature = currentWeatherObj.temperature;
      const feelsLike = currentWeatherObj.feelslike;

      callBack(
        undefined,
        `Weather is ${weatherDescription}. It is currently ${temperature} degree, feels like ${feelsLike} degree`,
      );
    })
    .catch((err) => {
      callBack(err, undefined);
    });
};
