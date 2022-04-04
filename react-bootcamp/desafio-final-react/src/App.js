import React, { useEffect, useState } from "react";
import Header from './components/Header'
import Main from './components/Main'
import { read } from "./services/apiService";
import _ from 'lodash'
import ChampionshipTable from "./components/ChampionshipTable";
export default function App() {

  const [currentYear, setCurrentYear] = useState('2003');
  const [championship, setChampionship] = useState([]);

  useEffect(() => {
    async function getDataFromSelectedYear() {
      setNewChampionship(await read(`/${currentYear}`));
    }

    getDataFromSelectedYear();
  }, [currentYear]);

  let buildedChampionship = [];


  function setNewChampionship(rounds) {
    // console.log(rounds)
    buildedChampionship = [];
    debugger
    rounds.forEach(round => {
      round.partidas.forEach(match => {
        analyseMatchDetails(match);
      })
    })

  }

  function analyseMatchDetails(match) {
    const awaySquad = {};
    const homeSquad = {};

    homeSquad.name = match.mandante;
    homeSquad.wins = match.pontuacao_geral_mandante.total_vitorias
    homeSquad.loses = match.pontuacao_geral_mandante.total_derrotas
    homeSquad.draws = match.pontuacao_geral_mandante.total_empates
    homeSquad.goals = match.placar_mandante;
    homeSquad.sufferedGoals = match.placar_visitante;
    homeSquad.totalGoals = homeSquad.goals - homeSquad.sufferedGoals;
    homeSquad.totalPoints = match.pontuacao_geral_mandante.total_vitorias * 3 + match.pontuacao_geral_mandante.total_empates;


    const homeIndex = buildedChampionship.findIndex(squad => { return squad.name.toLowerCase() === homeSquad.name.toLowerCase() });
    if (homeIndex === -1) {
      buildedChampionship.push(homeSquad);
    } else {
      homeSquad.goals = match.placar_mandante + buildedChampionship[homeIndex].goals;
      homeSquad.sufferedGoals = match.placar_visitante + buildedChampionship[homeIndex].sufferedGoals;
      homeSquad.totalGoals = homeSquad.totalGoals + buildedChampionship[homeIndex].totalGoals;
      buildedChampionship[homeIndex] = homeSquad;
    }

    awaySquad.name = match.visitante;
    awaySquad.wins = match.pontuacao_geral_visitante.total_vitorias
    awaySquad.loses = match.pontuacao_geral_visitante.total_derrotas
    awaySquad.draws = match.pontuacao_geral_visitante.total_empates
    awaySquad.goals = match.placar_visitante;
    awaySquad.sufferedGoals = match.placar_mandante;
    awaySquad.totalGoals = awaySquad.goals - awaySquad.sufferedGoals;
    awaySquad.totalPoints = match.pontuacao_geral_visitante.total_vitorias * 3 + match.pontuacao_geral_visitante.total_empates;



    const awayIndex = buildedChampionship.findIndex(squad => { return squad.name.toLowerCase() === awaySquad.name.toLowerCase() });
    if (awayIndex === -1) {
      buildedChampionship.push(awaySquad);
    } else {
      awaySquad.goals = match.placar_visitante + buildedChampionship[awayIndex].goals;
      awaySquad.sufferedGoals = match.placar_mandante + buildedChampionship[awayIndex].sufferedGoals;
      awaySquad.totalGoals = awaySquad.totalGoals + buildedChampionship[awayIndex].totalGoals;
      buildedChampionship[awayIndex] = awaySquad;
    }

    // console.log(_.orderBy(buildedChampionship, ['totalPoints', 'wins', 'draws', 'loses', 'goals', 'sufferedGoals', 'totalGoals'], ['asc']))
    setChampionship(_.orderBy(buildedChampionship, ['totalPoints', 'wins', 'draws', 'loses', 'goals', 'sufferedGoals', 'totalGoals'], ['asc']))
  }



  return (
    <div>
      <Header>Tabela Brasileirão</Header>

      <Main>
        <ChampionshipTable championship={championship} />
      </Main>
    </div>
  )
}
