import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) =>
        country?.name?.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error fetching data: {error.message}</h2>;
  }

  return (
    <div className="app-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a country..."
        className="search-box"
      />
      <div className="grid-container">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country?.name?.common}>
            <div>
              <img
                src={country?.flags?.png}
                alt={`Flag of ${country?.name?.common}`}
                className="flag"
              />
              <h2>{country?.name?.common}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;