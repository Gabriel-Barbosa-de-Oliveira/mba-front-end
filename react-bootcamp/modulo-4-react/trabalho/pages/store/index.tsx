import Link from "next/link";

export async function getStaticProps() {
  const products = await fetch(
    `https://fakestoreapi.com/products?sort=desc&limit=10`
  ).then((res) => res.json());

  const date = new Date();
  return {
    props: {
      products,
      lastRenderer: date.getSeconds(),
    },
    revalidate: 5,
  };
}

const Index = ({
  products,
  lastRenderer,
}: {
  products: Array<any>;
  lastRenderer: Date;
}) => {
  return (
    <div>
      <div>{lastRenderer}</div>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link href={`/store/${product.id}`}>
                <a>{product.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Index;
