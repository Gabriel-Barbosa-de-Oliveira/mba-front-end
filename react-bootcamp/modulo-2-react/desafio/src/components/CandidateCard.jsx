import React from "react";
import { numberFormatter } from "../helpers/numberFormatter";

export default function CandidateCard({ children: candidate }) {
  const electedMessage = candidate.isElect ? "Eleito" : "Não eleito";
  const fontColor = candidate.isElect ? "text-green-700" : "text-yellow-500";

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
          <span className={fontColor}>{candidate.candidatePercentage} %</span>
          <span>{numberFormatter(candidate.votes)} votos</span>
        </div>
      </div>
      <div className="grid grid-cols-1 text-center items-center">
        <span>{candidate.name}</span>
        <span className={fontColor}>{electedMessage}</span>
      </div>
    </div>
  );
}
