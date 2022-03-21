export async function getStaticProps() {
  const coins = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  ).then((res) => res.json());

  const date = new Date();

  return {
    props: {
      coins,
      lastRenderer: date.toDateString() + date.getSeconds(),
    },
    revalidate: 5,
  };
}

const Isr = ({
  coins,
  lastRenderer,
}: {
  coins: Array<any>;
  lastRenderer: Date;
}) => {
  console.log(lastRenderer);
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

export default Isr;
