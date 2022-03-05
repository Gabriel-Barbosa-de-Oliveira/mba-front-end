import React, { useEffect, useState } from "react";
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
import { getEventsEndpoint, IEvent } from "./interfaces/backend";

const useStyles = makeStyles({
  root: {},
  table: {
    minWidth: 650,
    borderTop: "1px solid rgb(224,224,224)",
    minHeight: "100%",
    tableLayout: "fixed",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(224,224,224)",
    },
    "& td": {
      verticalAlign: "top",
      overflow: "hidden",
      padding: "8px 4px",
    },
  },
  dayOfMonth: {
    fontWeight: 500,
    marginBottom: "4px",
  },
  events: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    whiteSpace: "nowrap",
    margin: "4px 0",
  },
});

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

export default function CalendarScreen() {
  const classes = useStyles();
  const [events, setEvents] = useState<IEvent[]>([]);
  const weeks = generateCalendar(getToday(), events);
  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    getEventsEndpoint(firstDate, lastDate).then(setEvents);
  }, [firstDate, lastDate]);

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
            {weeks.map((week, i) => (
              <TableRow key={i}>
                {week.map((cell) => (
                  <TableCell align="center" key={cell.date}>
                    <div className={classes.dayOfMonth}>{cell.dayOfMonth}</div>
                    {cell.events.map((event) => (
                      <button className={classes.events}>
                        {event.time && (
                          <Icon fontSize="inherit">watch_later</Icon>
                        )}
                        {event.time && (
                          <Box component="span" margin="0 4px">
                            {event.time}
                          </Box>
                        )}
                        <span>{event.desc}</span>
                      </button>
                    ))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEvent[];
}

function generateCalendar(
  date: string,
  allEvents: IEvent[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + "T12:00:00");
  const currentMonth = jsDate.getMonth();
  const currentDay = new Date(jsDate.valueOf());
  jsDate.setDate(1);
  const dayOfWeek = currentDay.getDay();

  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];
    for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0");
      const dayStr = currentDay.getDate().toString().padStart(2, "0");
      const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;
      week.push({
        dayOfMonth: currentDay.getDate(),
        date: isoDate,
        events: allEvents.filter((e) => e.date === isoDate),
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}

function getToday() {
  return "2021-06-17";
}
