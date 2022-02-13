import React from "react";

export default function Country({ children: country = null }) {
  if (!country) {
    return <div>Impossível renderizar o páis</div>;
  }
  return <div>{country.name}</div>;
}
