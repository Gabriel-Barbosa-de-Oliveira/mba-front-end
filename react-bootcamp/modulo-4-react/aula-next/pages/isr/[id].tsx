export async function getStaticPaths() {
  const coins = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=false`
  ).then((res) => res.json());

  const paths = coins.map((item: any) => ({ params: { id: item.id } }));

  return {
    paths,
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
    revalidate: 5,
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
