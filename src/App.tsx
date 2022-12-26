import './App.scss'
import { ChangeEvent, useState } from 'react';

const App = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('')

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${import.meta.env.VITE_APP_API_KEY}`
    )
  }
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInputValue(value)

    if(value === "") return

    getSearchOptions(value)
  }

  return (
    <main className="App">
      <section className="App-background-box">
        <h1 className="title">
          Weather<span className="question-title">?</span>
        </h1>
        <p className="title-info">Type and choose location below to see forecast</p>
        <div>
          <input type="text" value={inputValue} className="main-input" onChange={onInputChange} />
          <button className="search-button">search</button>
        </div>
      </section>
    </main>
  )
}

export default App
