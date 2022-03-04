import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {},
  table: {
    minWidth: 650,
    borderTop: "1px solid rgb(224,224,224)",
    minHeight: "100%",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(224,224,224)",
    },
  },
});

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

export default function CalendarScreen() {
  const classes = useStyles();

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224,224,224)"
        width="16em"
        padding="8px 16px"
      >
        <h2>Agenda React</h2>
        <Button variant="contained" color="primary">
          Novo Evento
        </Button>

        <Box marginTop="64px">
          <h3>Agendas</h3>
        </Box>
        <FormControlLabel control={<Checkbox />} label="Pessoal" />
        <FormControlLabel control={<Checkbox />} label="Trabalho" />
      </Box>
      <TableContainer component={"div"}>
        <Box display="flex" alignItems="center" padding="8px 16px">
          <Box flex="1">
            <IconButton aria-label="Mês Anterior">
              <Icon>chevron_left</Icon>
            </IconButton>
            <IconButton aria-label="Próximo Mês">
              <Icon>chevron_right</Icon>
            </IconButton>
          </Box>
          <Box flex="1" marginLeft="14px" component="h3">
            Junho de 2021
          </Box>
          <IconButton aria-label="Usuário">
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          </IconButton>
        </Box>
        <Table className={classes.table} aria-label="a simple table">
          <TableHead>
            <TableRow>
              {DAYS_OF_WEEK.map((day) => (
                <TableCell align="center" key={day}>
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {DAYS_OF_WEEK.map((day) => (
                <TableCell align="center">x</TableCell>
              ))}
            </TableRow>
            <TableRow>
              {DAYS_OF_WEEK.map((day) => (
                <TableCell align="center">x</TableCell>
              ))}
            </TableRow>
            <TableRow>
              {DAYS_OF_WEEK.map((day) => (
                <TableCell align="center">x</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
