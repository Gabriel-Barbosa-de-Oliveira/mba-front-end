import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Main from "../components/Main";
import { getDataFromApi } from "../services/apiService";
import SelectInput from "../components/SelectInput";
import CityDetails from "../components/CityDetails";

export default function ReactElectionsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);
  const [election, setElection] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

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
        setSelectedCity(cities[0]);
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

  function handleCityChange(cityId) {
    const index = allCities.findIndex((city) => city.id === cityId);
    setSelectedCity(allCities[index]);
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
        <header className="text-center">
          <span>Escolha o município</span>
        </header>
        <section className="flex flex-row items-center justify-center space-x-4">
          <SelectInput options={allCities} onSelectChange={handleCityChange} />
        </section>
        <section className="border">
          <div>
            <CityDetails selectedCity={selectedCity} />
          </div>
        </section>
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
