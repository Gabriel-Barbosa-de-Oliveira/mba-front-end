import { IDespesa } from "../interfaces/despesas.interface";
import { getDespesasEndpoint } from "../components/backend";
import Date from "./Date";
import Table from "./DataTable";
import Total from "./Total";
import "../css/Main.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Summary from "./Summary";
import { sumDespesas } from "../functions/sumDespesasValor";
import { UserMenu } from "./UserMenu";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
export default function Main() {
  const [despesas, setDespesas] = useState<Array<IDespesa>>([]);
  const [total, setTotal] = useState<number>(0);
  const { mes } = useParams<{ mes: string }>();
  const splitedMonth = mes.split("-");
  let month: string = splitedMonth[1];
  let year: string = splitedMonth[0];
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  console.log(splitedMonth);
  useEffect(() => {
    getDespesasEndpoint(`${year}-${month}`).then(
      (despesas: Array<IDespesa>) => {
        console.log(despesas);
        setDespesas(despesas);
        setTotal(sumDespesas(despesas));
        const splitedMonth = mes.split("-");
        month = splitedMonth[1];
        year = splitedMonth[0];
      }
    );
  }, [month, year]);

  return (
    <>
      <section className="main-section">
        <header className="header-section">
          <h2>Despesas</h2>
          <UserMenu />
        </header>
        <section className="header-section">
          <div className="date">
            <Date />
          </div>
          <div className="total">
            <Total total={total} />
          </div>
        </section>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <Tab label="Resumo" />
            <Tab label="Detalhes" />
          </Tabs>
        </Paper>
        <section className="content-section">
          {value === 1 ? (
            <Table data={despesas} />
          ) : (
            <Summary data={despesas} />
          )}
        </section>
      </section>
    </>
  );
}
