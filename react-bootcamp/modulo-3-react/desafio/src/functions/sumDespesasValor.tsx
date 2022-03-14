import { IDespesa } from "../interfaces/despesas.interface";

export function sumDespesas(despesas: Array<IDespesa>): number {
  let total: number = 0;
  despesas.map((despesa: IDespesa) => {
    total = despesa.valor + total;
  });
  total = formatCurrency(total);
  return Number((total as any).toFixed(2));
}

function formatCurrency(total: number) {
  total.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  }) as any as number;
  return total;
}
