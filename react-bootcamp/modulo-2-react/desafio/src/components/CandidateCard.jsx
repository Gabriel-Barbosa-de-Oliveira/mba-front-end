import React from "react";
import { numberFormatter } from "../helpers/numberFormatter";

export default function CandidateCard({ children: candidate }) {
  return (
    <div
      className={`shadow-lg m-2 p-4 w-60 h-60
    flex flex-row flex-wrap justify-center 
    font-semibold `}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <img
          src={require(`../assets/img/${candidate.imgName}`).default}
          alt={candidate.name}
          className="w-16 rounded-full"
        />
        <div className="grid grid-cols-1">
          <span>10%</span>
          <span>{numberFormatter(candidate.votes)} votos</span>
        </div>
      </div>
      <div className="grid grid-cols-1 text-center">
        <div className="flex flex-row justify-between items-center">
          <span>{candidate.name}</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span>Não Eleito</span>
        </div>
      </div>
    </div>
  );
}
