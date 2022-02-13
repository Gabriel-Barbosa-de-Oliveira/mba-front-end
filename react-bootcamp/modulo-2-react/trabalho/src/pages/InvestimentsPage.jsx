import React from "react";
import Header from "../components/Header";
import Investments from "../components/Investments";
import Main from "../components/Main";
import { allInvestments } from "../data/investments-2-1-1";
import _ from "lodash";
import Investment from "../components/Investment";
export default function InvestimentsPage() {
  const { investments, reports } = allInvestments;
  console.log(investments);
  console.log(reports);
  return (
    <div>
      <Header>react-investments v1.0.1</Header>
      <Main>
        <Investments>
          {investments.map((investment) => {
            const allReportsBasedOnId = _.orderBy(
              reports.filter((report) => {
                return report.investmentId === investment.id;
              }),
              ["month"]
            );

            console.log(allReportsBasedOnId, "reports");
            return (
              <div key={investment.id} className="m-5">
                <h1 className="text-center font-semibold text-lg">
                  {investment.description}
                </h1>
                <h2 className="text-center">
                  <span className="font-semibold">Rendimento Total:</span>{" "}
                  <span className="text-green-600">10000</span>
                </h2>

                {allReportsBasedOnId.map((report) => {
                  return (
                    <div key={report.id}>
                      <Investment>{report}</Investment>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Investments>
      </Main>
    </div>
  );
}
