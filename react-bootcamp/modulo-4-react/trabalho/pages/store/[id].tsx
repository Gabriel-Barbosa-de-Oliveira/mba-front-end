import styled, { css, keyframes, ThemeProvider } from "styled-components";
export async function getStaticPaths() {
  const products = await fetch(
    `https://fakestoreapi.com/products?sort=desc&limit=10`
  ).then((res) => res.json());

  const paths = products.map((item: any) => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
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

const StyledContainer = styled.section`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  display: grid;
  justify-items: center;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
`;

const StyleHeader = styled.h1`
  color: black;
  font-size: 42px;
  text-align: center;
  padding: 16px;
  font-weight: 400;
`;

const StyledImg = styled.img`
  align-self: start;
  max-height: 400px;
  max-width: 400px;
`;

const Product = ({ product }: { product: any }) => {
  if (!product) {
    return <div></div>;
  }
  return (
    <StyledContainer>
      <StyleHeader>{product.title}</StyleHeader>
      <StyledImg src={product.image} />
      {product.price}
    </StyledContainer>
  );
};

export default Product;
