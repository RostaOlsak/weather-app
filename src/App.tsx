import "./App.scss";
import SearchInput from "./components/SearchInput";
import Forecast from "./components/Forecast";
import useForecast from "./customHooks/useForecast";

const App = (): JSX.Element => {
  const {
    inputValue,
    suggestions,
    forecast,
    onButtonClick,
    onSuggestionSelect,
    onInputChange,
  } = useForecast();
  return (
    <main className="App">
      {forecast ? (
        <Forecast
          forecastData={forecast}
          inputValue={inputValue}
          suggestions={suggestions}
          onInputChange={onInputChange}
          onButtonClick={onButtonClick}
          onSuggestionSelect={onSuggestionSelect}
        />
      ) : (
        <SearchInput
          inputValue={inputValue}
          suggestions={suggestions}
          onInputChange={onInputChange}
          onButtonClick={onButtonClick}
          onSuggestionSelect={onSuggestionSelect}
        />
      )}
    </main>
  );
};

export default App;
