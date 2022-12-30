import { useState, useEffect, ChangeEvent } from "react";
import { suggestionType, forecastType } from "../types";

const useForecast = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<[]>([]);
  const [city, setCity] = useState<suggestionType | null>(null);
  const [forecast, setForecast] = useState<forecastType | null>(null);

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=6&appid=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setSuggestions(data)).catch(e => console.log(e));
  };
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);

    if (value === "") return;

    getSearchOptions(value);
  };

  const getForecast = (suggestion: suggestionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        suggestion.lat
      }&lon=${suggestion.lon}&units=metric&exclude={part}&appid=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastStats = {
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setForecast(forecastStats);
      }).catch(e => console.log(e));
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
  return {
    inputValue,
    suggestions,
    forecast,
    onButtonClick,
    onSuggestionSelect,
    onInputChange,
  };
};

export default useForecast;
