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

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});

export default function DataTable(props: DataTableProps) {
  const classes = useStyles();
  const { data } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Despesa</TableCell>
            <TableCell align="left">Categoria</TableCell>
            <TableCell align="left">Dia</TableCell>
            <TableCell align="left">Valor (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((despesa: IDespesa) => (
            <TableRow key={despesa.id}>
              <TableCell align="left">{despesa.descricao}</TableCell>
              <TableCell align="left">{despesa.categoria}</TableCell>
              <TableCell align="left">{despesa.dia}</TableCell>
              <TableCell align="left">{despesa.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
