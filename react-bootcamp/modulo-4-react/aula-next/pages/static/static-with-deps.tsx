export async function getStaticProps() {
  const coins = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  ).then((res) => res.json());

  return {
    props: {
      coins,
      propTest: "this is a test",
    },
  };
}

const Static = ({
  coins,
  propTest,
}: {
  coins: Array<any>;
  propTest: string;
}) => {
  console.log(propTest);
  return (
    <ul>
      {coins.map((item) => {
        return (
          <li key={item.id}>
            <a>{item.name}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default Static;
