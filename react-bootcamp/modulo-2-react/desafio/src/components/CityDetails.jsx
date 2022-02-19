import React from "react";
import { numberFormatter } from "../helpers/numberFormatter";

export default function CityDetails({ selectedCity = {} }) {
  const { id, name, presence, absence, votingPopulation } = selectedCity;
  return (
    <div id={id}>
      <div className="text-center font-bold mb-2 p-2">
        <span>Eleição em {name}</span>
      </div>
      <div className="flex flex-row items-center justify-center space-x-4 flex-wrap">
        <div>
          <span className="font-bold">Total de eleitores: </span>
          {numberFormatter(votingPopulation)}
        </div>
        <div>
          <span className="font-bold">Abstenção: </span>
          {numberFormatter(absence)}
        </div>
        <div>
          <span className="font-bold">Comparecimento: </span>
          {numberFormatter(presence)}
        </div>
      </div>
    </div>
  );
}
