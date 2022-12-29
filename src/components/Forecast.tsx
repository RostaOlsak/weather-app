import { forecastType } from "../types";
import Feels from "./Icons/Pocit";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";

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
          <div className=""><Sunrise /></div>
          <div className=""><Sunset /></div>
        </section>
      </div>
    </div>
  );
};

export default Forecast;
