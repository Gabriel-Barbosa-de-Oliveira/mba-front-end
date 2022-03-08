import { IDespesas } from "../interfaces/despesas.interface";

export function getDespesasEndpoint(
  mes: string = "2021-01",
  sort: string = "dia"
): Promise<Array<IDespesas>> {
  return fetch(`http://localhost:3001/despesas?mes=${mes}&_sort=${sort}`).then(
    (resp) => {
      return resp.json();
    }
  );
}
