import { useState } from "react";
import Main from "../components/Main";
import TextInput from "../components/TextInput";
import Header from "../components/Header";
import { allCountries } from "../data/countries";
import Countries from "../components/Countries";
export default function ReactCountriesPage() {
  const [countryFilter, setCountryFilter] = useState("Argentina");

  function handleCountryFilterChange(newCountryFilter) {
    setCountryFilter(newCountryFilter);
  }

  const countryFilterLowerCase = countryFilter.trim().toLocaleLowerCase();

  const filteredCountries =
    countryFilterLowerCase.length >= 3
      ? allCountries.filter(({ nameLowerCase }) =>
          nameLowerCase.includes(countryFilterLowerCase)
        )
      : allCountries;

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
        <Countries>{filteredCountries}</Countries>
      </Main>
    </div>
  );
}
