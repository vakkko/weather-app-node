import axios from "axios";

export const geocode = (address, callback) => {
  axios
    .get(
      `https://nominatim.openstreetmap.org/search?city=${address}&format=jsonv2`,
      {
        headers: {
          "Accept-Language": "en",
        },
      },
    )
    .then(({ data }) => {
      if (!data.length) {
        return callback("Location is not found", undefined);
      }
      const { lat: latitude, lon: longitude, name: location } = data[0];
      callback(undefined, { latitude, longitude, location });
    })
    .catch((err) => {
      callback(err.message, undefined);
    });
};
