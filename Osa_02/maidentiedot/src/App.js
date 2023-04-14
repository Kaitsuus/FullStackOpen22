import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';
import CountryData from './components/CountryData';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleQueryChange = (event) => {
    const search = event.target.value;
    setQuery(search);
    setShowCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        Find countries{' '}
        <input type="text" value={query} onChange={handleQueryChange} />
      </header>
      <div>
        {showCountries.length === 1 ? (
          <CountryData country={showCountries[0]} />
        ) : null}
        {showCountries.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : (
          <Countries
            showCountries={showCountries}
            setShowCountries={setShowCountries}
          />
        )}
      </div>
    </div>
  );
}

export default App;
