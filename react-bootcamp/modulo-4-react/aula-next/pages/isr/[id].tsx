export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "bitcoin" } },
      { params: { id: "ethereum" } },
      { params: { id: "solana" } },
    ],
    fallback: true,
  };
}
export async function getStaticProps({ params }: { params: any }) {
  const coin = await fetch(
    `https://api.coingecko.com/api/v3/coins/${params.id}`
  ).then((res) => res.json());

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
  coin: any;
  lastRenderer: Date;
}) => {
  if (!coin) {
    return <div></div>;
  }
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
