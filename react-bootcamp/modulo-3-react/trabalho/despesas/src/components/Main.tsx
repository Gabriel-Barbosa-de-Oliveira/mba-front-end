import { IDespesa } from "../interfaces/despesas.interface";
import { getDespesasEndpoint } from "../services/backend";
import Date from "./Date";
import Table from "./DataTable";
import Total from "./Total";
import "../css/Main.css";
import { useEffect, useState } from "react";

export default function Main() {
  const [despesas, setDespesas] = useState<Array<IDespesa>>([]);
  const [total, setTotal] = useState<number>(0);
  const month: string = "01";
  const year: string = "2021";

  useEffect(() => {
    getDespesasEndpoint(month, year).then((despesas: Array<IDespesa>) => {
      console.log(despesas);
      setDespesas(despesas);
      sumDespesas(despesas);
    });
  }, [month, year]);

  function sumDespesas(despesas: Array<IDespesa>): void {
    let total: number = 0;
    despesas.map((despesa: IDespesa) => {
      total = despesa.valor + total;
    });
    total = formatCurrency(total);
    setTotal((total as any).toFixed(2));
  }
  function formatCurrency(total: number) {
    total.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    }) as any as number;
    return total;
  }

  return (
    <section className="main-section">
      <header className="header-section">
        <div className="date">
          <Date />
        </div>
        <div className="total">
          <Total total={total} />
        </div>
      </header>
      <section className="table-section">
        <Table data={despesas} />
      </section>
    </section>
  );
}
