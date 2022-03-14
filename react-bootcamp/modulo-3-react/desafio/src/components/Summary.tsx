import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IDespesa } from "../interfaces/despesas.interface";
import { DataTableProps } from "../interfaces/DataTableProps";
import _ from "lodash";
import { sumDespesas } from "../functions/sumDespesasValor";

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});
export default function Summary(props: DataTableProps) {
  const classes = useStyles();
  const data = _.groupBy(props.data, "categoria");
  const formattedValues: Array<any> = [];
  Object.keys(data).forEach((key, index) => {
    const value: number = sumDespesas(data[key]);
    formattedValues.push({ name: key, id: index, value });
  });
  console.log(formattedValues);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Categoria</TableCell>
            <TableCell align="right">Valor (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedValues.map((despesa: any) => (
            <TableRow key={despesa.id}>
              <TableCell align="left">{despesa.name}</TableCell>
              <TableCell align="right">
                <b>{despesa.value}</b>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
