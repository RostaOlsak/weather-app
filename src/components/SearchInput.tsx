import { ChangeEvent } from "react";
import { suggestionType } from "../types";

type Props = {
  inputValue: string;
  suggestions: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
  onSuggestionSelect: (suggestion: suggestionType) => void;
};

const SearchInput = ({
  inputValue,
  suggestions,
  onInputChange,
  onButtonClick,
  onSuggestionSelect,
}: Props): JSX.Element => {
  return (
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
        <button className="search-button" onClick={onButtonClick}>
          search
        </button>
        <ul className="input-suggestion">
          {suggestions.map((suggestion: suggestionType, index: number) => (
            <li className="li-suggestion" key={suggestion.name + "-" + index}>
              <button
                className="suggestion-button"
                onClick={() => onSuggestionSelect(suggestion)}
              >
                {suggestion.name}, {suggestion.country}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SearchInput;
