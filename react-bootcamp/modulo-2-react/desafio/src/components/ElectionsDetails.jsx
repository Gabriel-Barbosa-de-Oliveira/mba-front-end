import React from "react";
import CandidateCard from "./CandidateCard";

export default function ElectionsDetails({
  allCandidates = [],
  elections = [],
}) {
  console.log(allCandidates);
  console.log(elections);

  const candidateImgName = {
    ironman: "ironMan.png",
    blackwidow: "blackWidow.png",
    superman: "superman.png",
    captainmarvel: "captainMarvel.png",
    thor: "thor.png",
    greenlantern: "greenLantern.png",
    spiderman: "spiderMan.png",
    captainamerica: "captainAmerica.png",
    aquaman: "aquaman.png",
    batman: "batman.png",
    wonderwoman: "wonderWoman.png",
    flash: "flash.png",
    antman: "antman.png",
  };

  function getCandidateData(selectedCandidate) {
    const foundCandidate = allCandidates.find(
      (candidate) => candidate.id === selectedCandidate.candidateId
    );
    const candidateData = {
      ...foundCandidate,
      votes: selectedCandidate.votes,
      imgName: candidateImgName[foundCandidate.username],
    };
    console.log(candidateData);
    return candidateData;
  }

  return (
    <div className="flex flex-row items-center justify-center space-x-4 flex-wrap">
      {elections.map((candidate) => {
        return (
          <div key={candidate.id}>
            <CandidateCard>{getCandidateData(candidate)}</CandidateCard>
          </div>
        );
      })}
    </div>
  );
}
