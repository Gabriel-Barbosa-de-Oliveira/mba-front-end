import { useState } from "react";
import Main from "../components/Main";
import TextInput from "../components/TextInput";
import Header from "../components/Header";
import { allCountries } from "../data/countries";
export default function ReactCountriesPage() {
  const [countryFilter, setCountryFilter] = useState("Argentina");

  function handleCountryFilterChange(newCountryFilter) {
    setCountryFilter(newCountryFilter);
  }

  const countryFilterLowerCase = countryFilter.toLocaleLowerCase();

  const filteredCountries =
    countryFilterLowerCase.length >= 3
      ? allCountries.filter(({ nameLowerCase }) =>
          nameLowerCase.includes(countryFilterLowerCase)
        )
      : allCountries;

  console.log(filteredCountries);

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
      </Main>
    </div>
  );
}
