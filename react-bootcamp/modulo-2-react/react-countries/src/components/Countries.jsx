import React from "react";
import Country from "./Country";

export default function Countries({ children: countries = [] }) {
  return (
    <div>
      <h2 className="text-center font-semibold">{countries.length} país(es)</h2>
      {countries.map((country) => {
        return <Country key={country.id}>{country}</Country>;
      })}
    </div>
  );
}
