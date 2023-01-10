
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


function App() {

  const[countries, setNewCountry] = useState([]) 
  const[filter, setNewFilter] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setNewCountry(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }                              

  const filteredCountries = filter ? countries.filter(country => country.name.common.toLowerCase().includes(filter)) : countries
  let length = filteredCountries.length  

  return (
    <div >
      <h1> Countries </h1>
      find countries  <input onChange={handleFilterChange} />

      <div>
        {length > 1 && length < 11 && filteredCountries.map(country =>
            <li>
            {country.name.common} 
            <button onClick={ () => {}}>show</button>
            </li>
        )}
       {length === 1 && filteredCountries.map(country => 
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>

        <h4>Languages</h4>
        <p>jeejeee</p>

        <img src={country.flags.svg} alt="flag" width="325" height="175" />
        </div>
        )}
        {length > 10 &&
        <p>Too many matches, specify the search</p>
        }
        {length === 0 &&
        <p>No matching countries</p>
        }
      </div>
    </div>
  );
  
}



export default App;
