import React from "react";
import Country from "./Country";

export default function Countries({
  children: countries = [],
  onCountryClick = null,
}) {
  return (
    <div className="border p-2">
      <h2 className="text-center font-semibold">{countries.length} país(es)</h2>
      {countries.map((country) => {
        return (
          <Country onCountryClick={onCountryClick} key={country.id}>
            {country}
          </Country>
        );
      })}
    </div>
  );
}
