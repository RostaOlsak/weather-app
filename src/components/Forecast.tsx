import {
  getHumidity,
  getPop,
  getTime,
  getVisibility,
  getWindDirection,
} from "../supportFunctions";
import { forecastType } from "../types";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";
import Pack from "./Pack";
import { ChangeEvent } from "react";
import { suggestionType } from "../types";
import { useRef } from "react";

type Props = {
  forecastData: forecastType;
  inputValue: string;
  suggestions: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
  onSuggestionSelect: (suggestion: suggestionType) => void;
};

const Celsius = ({ temp }: { temp: number }): JSX.Element => (
  <span>{temp}°</span>
);

const Forecast = ({
  forecastData,
  inputValue,
  suggestions,
  onInputChange,
  onButtonClick,
  onSuggestionSelect,
}: Props): JSX.Element => {
  const currentWeather = forecastData.list[0];

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const clearInput = (): void => {
    inputRef.current!.value = "";
    inputRef.current!.focus();
  };

  return (
    <div className="forecast-container">
      <section className="App-background-box2">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            className="main-input2"
            onChange={onInputChange}
          />
          <button className="search-button2" onClick={onButtonClick}>
            search
          </button>
          <button className="search-button-clear" onClick={clearInput}>
            +
          </button>
          <ul className="input-suggestion2">
            {suggestions.map((suggestion: suggestionType, index: number) => (
              <li className="li-suggestion" key={suggestion.name + "-" + index}>
                <button
                  className="suggestion-button"
                  onClick={() => onSuggestionSelect(suggestion)}
                >
                  {suggestion.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="forecast-main">
        <section className="forecast-section-container">
          <img
            src={`http://openweathermap.org/img/wn/${forecastData.list[0].weather[0].icon}@2x.png`}
          />
          <h2 className="forecast-title">
            {forecastData.name},{" "}
            <span className="forecast-title-span">{forecastData.country}</span>
          </h2>
          <h1 className="forecast-today">
            <Celsius temp={Math.round(currentWeather.main.temp)} />
          </h1>
          <p>
            <span className="description-span">
              {currentWeather.weather[0].main}{" "}
            </span>
            {currentWeather.weather[0].description}
          </p>
          <p className="maxmin">
            <span className="description-span">MAX.</span>{" "}
            <Celsius temp={Math.ceil(currentWeather.main.temp_max)} />{" "}
            <span className="description-span">MIN.</span>{" "}
            <Celsius temp={Math.floor(currentWeather.main.temp_min)} />
          </p>
          <section className="forecast-section-scroll">
            {forecastData.list.map((item, i) => (
              <div key={i}>
                <p className="scroll-time">
                  {i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}
                </p>
                <img
                  alt={`weather-icon-${item.weather[0].description}`}
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                />
                <p className="scroll-temp">
                  <Celsius temp={Math.round(item.main.temp)} />
                </p>
              </div>
            ))}
          </section>
        </section>

        <section className="additional-data-container">
          <div className="row">
            <div className="wind-container">
              <Pack
                icon="wind"
                title="Wind"
                info={`${Math.round(currentWeather.wind.speed)} km/h`}
                description={`${getWindDirection(
                  Math.round(currentWeather.wind.deg)
                )} ${currentWeather.wind.gust.toFixed(1)} km/h`}
              />
            </div>
            <div className="feel-container">
              <Pack
                icon="pocit"
                title="Feels like"
                info={
                  <Celsius temp={Math.round(currentWeather.main.feels_like)} />
                }
                description={`Feels ${
                  Math.round(currentWeather.main.feels_like) <
                  Math.round(currentWeather.main.temp)
                    ? "colder"
                    : "warmer"
                }`}
              />
            </div>
          </div>

          <div className="row">
            <div className="humidity-container">
              <Pack
                icon="vlhkost"
                title="Humidity"
                info={`${currentWeather.main.humidity} %`}
                description={getHumidity(currentWeather.main.humidity)}
              />
            </div>
            <div className="pop-container">
              <Pack
                icon="pop"
                title="Precipitation"
                info={`${Math.round(currentWeather.pop * 100)}%`}
                description={`${getPop(currentWeather.pop)}, clouds at ${
                  currentWeather.clouds.all
                }%`}
              />
            </div>
          </div>
          <div className="row">
            <div className="pressure-container">
              <Pack
                icon="tlak"
                title="Pressure"
                info={`${currentWeather.main.pressure} hPa`}
                description={` ${
                  Math.round(currentWeather.main.pressure) < 1013
                    ? "Lower"
                    : "Higher"
                } than standard`}
              />
            </div>
            <div className="visibility-container">
              <Pack
                icon="viditelnost"
                title="Visibility"
                info={`${(currentWeather.visibility / 1000).toFixed()} km`}
                description={getVisibility(currentWeather.visibility)}
              />
            </div>
          </div>

          <div className="sunset-sunrise">
            <div className="ss-container">
              <div className="ss-image">
                <Sunrise />
              </div>
              {getTime(forecastData.sunrise)}
            </div>
            <div className="ss-container">
              <div className="ss-image">
                <Sunset />
              </div>
              {getTime(forecastData.sunset)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Forecast;
