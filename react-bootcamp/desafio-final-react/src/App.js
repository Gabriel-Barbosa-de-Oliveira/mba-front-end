import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from './components/Header'
import Main from './components/Main'
import { read } from "./services/apiService";
import _ from 'lodash'
import ChampionshipTable from "./components/ChampionshipTable";
import setNewChampionship from "./services/championshipHandler";
import SelectInput from "./components/SelectInput";
export default function App() {

  const [currentYear, setCurrentYear] = useState('2004');
  const [championship, setChampionship] = useState([]);
  const years = [
    {
      id: '2003',
      value: '2003',
      name: '2003'
    }, {
      id: '2004',
      value: '2004',
      name: '2004'
    }, {
      id: '2005',
      value: '2005',
      name: '2005'
    }, {
      id: '2006',
      value: '2006',
      name: '2006'
    }, {
      id: '2007',
      value: '2007',
      name: '2007'
    }, {
      id: '2008',
      value: '2008',
      name: '2008'
    }, {
      id: '2009',
      value: '2009',
      name: '2009'
    }, {
      id: '2010',
      value: '2010',
      name: '2010'
    }, {
      id: '2011',
      value: '2011',
      name: '2011'
    }, {
      id: '2012',
      value: '2012',
      name: '2012'
    }, {
      id: '2013',
      value: '2013',
      name: '2013'
    }, {
      id: '2014',
      value: '2014',
      name: '2014'
    }, {
      id: '2015',
      value: '2015',
      name: '2015'
    }
  ]

  useEffect(() => {
    async function getDataFromSelectedYear() {
      setChampionship(setNewChampionship(await read(`/2013`)));
    }

    getDataFromSelectedYear();
  }, [currentYear]);

  function handleSelectChange(value) {
    setCurrentYear(value)
  }

  return (
    <div>
      <Header>Tabela Brasileirão</Header>
      <section className="select-input-container">
        <SelectInput options={years} onSelectChange={handleSelectChange} />
      </section>
      <Main>
        <ChampionshipTable championship={championship} />
      </Main>
    </div>
  )
}
