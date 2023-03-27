const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const appKey = "af5f9c9a2a1d0c99d0af858bc7caa75f";

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appKey}`;

  console.log("url:", url);
  request({ url, json: true }, (error, { body }) => {
    console.log("aaaa", body);
    const temp = (body.main.temp - 273.15) * (9 / 5) + 32;
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.weather[0].description +
          " now." +
          " It is currently " +
          temp.toFixed(2) +
          "°F" +
          " degress out. There is a " +
          body.wind.speed +
          " wind speed."
      );
    }
  });
};

module.exports = forecast;
