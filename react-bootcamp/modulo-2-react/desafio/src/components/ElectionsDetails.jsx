import React from "react";
import CandidateCard from "./CandidateCard";
import _ from "lodash";
export default function ElectionsDetails({
  allCandidates = [],
  elections = [],
}) {
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

  const totalVotes = _.sumBy(elections, "votes");
  function getCandidateData(selectedCandidate, index) {
    const foundCandidate = allCandidates.find(
      (candidate) => candidate.id === selectedCandidate.candidateId
    );
    const candidateData = {
      ...foundCandidate,
      votes: selectedCandidate.votes,
      imgName: candidateImgName[foundCandidate.username],
      isElect: index === 0 ? true : false,
      candidatePercentage: percentage(selectedCandidate.votes),
    };
    return candidateData;
  }

  function percentage(candidateVotes) {
    return _.round((100 * candidateVotes) / totalVotes, 2);
  }

  return (
    <div className="flex flex-row items-center justify-center space-x-4 flex-wrap">
      {elections.map((candidate, index) => {
        return (
          <div key={candidate.id}>
            <CandidateCard>{getCandidateData(candidate, index)}</CandidateCard>
          </div>
        );
      })}
    </div>
  );
}
