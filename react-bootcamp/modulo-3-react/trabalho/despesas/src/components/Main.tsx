import { IDespesas } from "../interfaces/despesas.interface";
import { getDespesasEndpoint } from "../services/backend";
import Date from "./Date";
import Table from "./DataTable";
import Total from "./Total";
import "../css/Main.css";

export default function Main() {
  getDespesasEndpoint().then((despesas: Array<IDespesas>) => {
    console.log(despesas);
  });

  return (
    <section className="main-section">
      <header className="header-section">
        <div className="date">
          <Date />
        </div>
        <div className="total">
          <Total />
        </div>
      </header>
      <section className="table-section">
        <Table />
      </section>
    </section>
  );
}
