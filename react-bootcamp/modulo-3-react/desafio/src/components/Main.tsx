import { IDespesa } from "../interfaces/despesas.interface";
import { getDespesasEndpoint } from "../components/backend";
import Date from "./Date";
import Table from "./DataTable";
import Total from "./Total";
import "../css/Main.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Main() {
  const [despesas, setDespesas] = useState<Array<IDespesa>>([]);
  const [total, setTotal] = useState<number>(0);
  const { mes } = useParams<{ mes: string }>();
  const splitedMonth = mes.split("-");
  let month: string = splitedMonth[1];
  let year: string = splitedMonth[0];
  console.log(splitedMonth);
  useEffect(() => {
    getDespesasEndpoint(`${year}-${month}`).then(
      (despesas: Array<IDespesa>) => {
        console.log(despesas);
        setDespesas(despesas);
        sumDespesas(despesas);
        const splitedMonth = mes.split("-");
        month = splitedMonth[1];
        year = splitedMonth[0];
      }
    );
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
