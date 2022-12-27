import "./App.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { suggestionType } from "./types";

const App = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<[]>([]);
  const [city, setCity] = useState<suggestionType | null>(null);

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=6&appid=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setSuggestions(data));
  };
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);

    if (value === "") return;

    getSearchOptions(value);
  };

  const getForecast = (suggestion: suggestionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        suggestion.lat
      }&lon=${suggestion.lon}&units=metric&exclude={part}&appid=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => console.log({ data }));
  };

  const onButtonClick = () => {
    if (!city) return;

    getForecast(city);
  };

  const onSuggestionSelect = (suggestion: suggestionType) => {
    setCity(suggestion);
  };

  useEffect(() => {
    if (city) {
      setInputValue(city.name);
      setSuggestions([]);
    }
  }, [city]);

  return (
    <main className="App">
      <section className="App-background-box">
        <h1 className="title">
          Weather<span className="question-title">?</span>
        </h1>
        <p className="title-info">
          Type and choose location below to see forecast
        </p>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            className="main-input"
            onChange={onInputChange}
          />
          <button className="search-button" onClick={onButtonClick}>search</button>
          <ul className="input-suggestion">
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
    </main>
  );
};

export default App;
