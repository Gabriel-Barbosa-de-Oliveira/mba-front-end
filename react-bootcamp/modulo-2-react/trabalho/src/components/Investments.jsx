import React from "react";
import { allInvestments } from "../data/investments-2-1-1";
export default function Investments() {
  const investiments = allInvestments;
  console.log(investiments);
  return <div>Investments</div>;
}
