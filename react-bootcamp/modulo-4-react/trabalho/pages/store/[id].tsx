export async function getStaticPaths() {
  const products = await fetch(
    `https://fakestoreapi.com/products?sort=desc&limit=10`
  ).then((res) => res.json());

  const paths = products.map((item: any) => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps({ params }: { params: any }) {
  const product = await fetch(
    `https://fakestoreapi.com/products/${params.id}`
  ).then((res) => res.json());

  return {
    props: {
      product,
    },
  };
}

const Product = ({ product }: { product: any }) => {
  if (!product) {
    return <div></div>;
  }
  return (
    <div>
      <span>
        {product.title}
        {product.price}
      </span>
    </div>
  );
};

export default Product;
