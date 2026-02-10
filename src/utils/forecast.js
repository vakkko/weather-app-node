import axios from "axios";

export const forecast = (latitude, longitude, callBack) => {
  axios
    .get(
      `https://api.weatherstack.com/current?access_key=cc582813c8d710b4b90e5195f31a7223&query=${latitude},${longitude}`,
    )
    .then(({ data }) => {
      if (!data.location.name) {
        callBack("Location is incorrect", undefined);
      }
      const currentWeatherObj = data.current;
      const [weatherDescription] = currentWeatherObj.weather_descriptions;
      const temperature = currentWeatherObj.temperature;
      const feelsLike = currentWeatherObj.feelslike;

      callBack(
        undefined,
        `Weather is ${weatherDescription}. It is currently ${temperature} degree, but feels like ${feelsLike} degree`,
      );
    })
    .catch((err) => {
      callBack(err, undefined);
    });
};
