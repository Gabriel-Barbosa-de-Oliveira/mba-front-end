import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Main from "../components/Main";
import { getDataFromApi } from "../services/apiService";
import SelectInput from "../components/SelectInput";

export default function ReactElectionsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  const [election, setElection] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const cities = await getDataFromApi("/cities");
        const candidates = await getDataFromApi("/candidates");
        const election = await getDataFromApi("/election");

        console.log(cities);
        console.log(candidates);
        console.log(election);

        setAllCities(cities);
        setAllCandidates(candidates);
        setElection(election);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }

    getData();
  }, []);

  function handleCityChange(evt) {
    console.log(evt);
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error />;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <div className="text-center mb-4">
          <span>Escolha o município</span>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <SelectInput options={allCities} onSelectChange={handleCityChange} />
        </div>
      </>
    );
  }
  return (
    <div>
      <Header>react-elections</Header>

      <Main>{mainJsx}</Main>
    </div>
  );
}
