import { useState } from "react";
import Main from "../components/Main";
import TextInput from "../components/TextInput";
import Header from "../components/Header";
import { allCountries } from "../data/countries";
import Countries from "../components/Countries";
export default function ReactCountriesPage() {
  const [countryFilter, setCountryFilter] = useState("");
  const [visitedCountries, setVisitedCountries] = useState([]);

  function handleCountryFilterChange(newCountryFilter) {
    setCountryFilter(newCountryFilter);
  }

  function toggleVisitedCountry(countryId) {
    let newVisitedCountries = [...visitedCountries];

    const isCountryVisited = newVisitedCountries.indexOf(countryId) !== -1;

    if (isCountryVisited) {
      newVisitedCountries = newVisitedCountries.filter(
        (visitedCountryId) => visitedCountryId !== countryId
      );
    } else {
      newVisitedCountries.push(countryId);
    }

    setVisitedCountries(newVisitedCountries);
  }

  const countryFilterLowerCase = countryFilter.trim().toLocaleLowerCase();

  const filteredCountries =
    countryFilterLowerCase.length >= 3
      ? allCountries.filter(({ nameLowerCase }) =>
          nameLowerCase.includes(countryFilterLowerCase)
        )
      : allCountries;

  console.log(visitedCountries);

  return (
    <div>
      <Header>react-countries</Header>
      <Main>
        <TextInput
          labelDescription="Informe o nome do páis (pelo menos 3 caracteres): "
          inputValue={countryFilter}
          autoFocus
          id="inputCountryFilter"
          onInputChange={handleCountryFilterChange}
        />
        <Countries onCountryClick={toggleVisitedCountry}>
          {filteredCountries}
        </Countries>
      </Main>
    </div>
  );
}
