import React from "react";

export default function Investment({ children: report = null, porcent = "0" }) {
  const months = {
    1: "Jan",
    2: "Fev",
    3: "Mar",
    4: "Abr",
    5: "Mai",
    6: "Jun",
    7: "Jul",
    8: "Ago",
    9: "Set",
    10: "Out",
    11: "Nov",
    12: "Dez",
  };
  let { month, year, value } = report;
  value = value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  return (
    <div className="border p-2 m-2 flex flex-row justify-between  cursor-pointer">
      <div className="space-x-2 text-sm">
        <span>
          {months[month]}/{year}
        </span>{" "}
        <span className="font-semibold">{value}</span>
      </div>
      <div>{porcent}%</div>
    </div>
  );
}
