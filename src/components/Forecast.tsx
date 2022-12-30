import { getHumidity, getPop, getTime, getVisibility, getWindDirection } from "../supportFunctions";
import { forecastType } from "../types";
import Feels from "./Icons/Pocit";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";
import Pack from "./Pack";

type Props = {
  forecastData: forecastType;
};

const Celsius = ({ temp }: { temp: number }): JSX.Element => (
  <span>{temp}°C</span>
);

const Forecast = ({ forecastData }: Props): JSX.Element => {
  const currentWeather = forecastData.list[0];
  return (
    <div className="forecast-container">
      <div className="forecast-main">
        <section className="forecast-section-container">
          <h2 className="forecast-title">
            {forecastData.name},{" "}
            <span className="forecast-title-span">{forecastData.country}</span>
          </h2>
          <h1 className="forecast-today">
            <Celsius temp={Math.round(currentWeather.main.temp)} />
          </h1>
          <p>
            {currentWeather.weather[0].main}{" "}
            {currentWeather.weather[0].description}
          </p>
          <p>
            MAX. <Celsius temp={Math.ceil(currentWeather.main.temp_max)} /> MIN.{" "}
            <Celsius temp={Math.floor(currentWeather.main.temp_min)} />
          </p>
          <section className="forecast-section-scroll">
            {forecastData.list.map((item, i) => (
              <div key={i}>
                <p>{i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}</p>
                <img
                  alt={`weather-icon-${item.weather[0].description}`}
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                />
                <p>
                  <Celsius temp={Math.round(item.main.temp)} />
                </p>
              </div>
            ))}
          </section>
        </section>

        <section className="additional-data-container">
          <div className="">
            <Sunrise />
            {getTime(forecastData.sunrise)}
          </div>
          <div className="">
            <Sunset />
            {getTime(forecastData.sunset)}
          </div>

          <Pack
            icon="wind"
            title="Wind"
            info={`${Math.round(currentWeather.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(currentWeather.wind.deg)
            )}, gusts ${currentWeather.wind.gust.toFixed(1)} km/h`}
          />
          <Pack
            icon="pocit"
            title="Feels like"
            info={<Celsius temp={Math.round(currentWeather.main.feels_like)} />}
            description={`Feels ${
              Math.round(currentWeather.main.feels_like) <
              Math.round(currentWeather.main.temp)
                ? "colder"
                : "warmer"
            }`}
          />
          <Pack
            icon="vlhkost"
            title="Humidity"
            info={`${currentWeather.main.humidity} %`}
            description={getHumidity(currentWeather.main.humidity)}
          />
          <Pack
            icon="pop"
            title="Precipitation"
            info={`${Math.round(currentWeather.pop * 100)}%`}
            description={`${getPop(currentWeather.pop)}, clouds at ${currentWeather.clouds.all}%`}
          />
          <Pack
            icon="tlak"
            title="Pressure"
            info={`${currentWeather.main.pressure} hPa`}
            description={` ${
              Math.round(currentWeather.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          />
          <Pack
            icon="viditelnost"
            title="Visibility"
            info={`${(currentWeather.visibility / 1000).toFixed()} km`}
            description={getVisibility(currentWeather.visibility)}
          />
        </section>
      </div>
    </div>
  );
};

export default Forecast;
