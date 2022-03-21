"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export async function getStaticProps() {
  const id: string = "bitcoin";
  const coin = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`).then(
    (res) => res.json()
  );

  const date = new Date();

  return {
    props: {
      coin,
      lastRenderer: date.getSeconds(),
    },
  };
}

const StaticPaths = ({
  coin,
  lastRenderer,
}: {
  coins: any;
  lastRenderer: Date;
}) => {
  console.log(lastRenderer);
  return (
    <div>
      <div>{lastRenderer}</div>
      <span>
        {coin.name}
        {coin.block_time_in_minutes}
      </span>
    </div>
  );
};

export default StaticPaths;
