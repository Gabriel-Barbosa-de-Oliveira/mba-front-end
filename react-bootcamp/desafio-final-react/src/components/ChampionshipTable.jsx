import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ChampionshipTable({ championship = [] }) {
  const formattedChampionship = championship.slice().reverse();
  console.log(formattedChampionship);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Pontos</TableCell>
            <TableCell align="right">Vitórias</TableCell>
            <TableCell align="right">Empates</TableCell>
            <TableCell align="right">Derrotas</TableCell>
            <TableCell align="right">Gols Pró</TableCell>
            <TableCell align="right">Gols Contra</TableCell>
            <TableCell align="right">Saldo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedChampionship.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className="img-container">
                  {index + 1}{" "}
                  <img
                    src={require(`../../img/${row.slug}.png`).default}
                    className={"squad-logo"}
                    alt={row.name}
                  />{" "}
                  {row.name}
                </div>
              </TableCell>
              <TableCell align="right">{row.totalPoints}</TableCell>
              <TableCell align="right">{row.wins}</TableCell>
              <TableCell align="right">{row.draws}</TableCell>
              <TableCell align="right">{row.loses}</TableCell>
              <TableCell align="right">{row.goals}</TableCell>
              <TableCell align="right">{row.sufferedGoals}</TableCell>
              <TableCell align="right">{row.totalGoals}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
