import { IDespesa } from "../interfaces/despesas.interface";

export function getDespesasEndpoint(
  mes: string = "01",
  ano: string = "2021"
): Promise<Array<IDespesa>> {
  return fetch(
    // `http://localhost:3001/despesas?mes=${ano}-${mes}&_sort=dia`
    `http://localhost:3001/despesas?mes=${mes}&_sort=dia`
  ).then((resp) => {
    return resp.json();
  });
}
