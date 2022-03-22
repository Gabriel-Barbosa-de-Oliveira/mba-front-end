import Link from "next/link";
import styled, { css, keyframes, ThemeProvider } from "styled-components";
import { useState } from "react";

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

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const StyledLi = styled.li`
  padding: 16px;
  font-size: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledImg = styled.img`
  justify-self: end;
  align-self: center;
  margin-right: 32px;
  height: 40px;
  width: 40px;
`;

const Index = ({
  products,
  lastRenderer,
}: {
  products: Array<any>;
  lastRenderer: Date;
}) => {
  return (
    <StyledContainer>
      <StyleHeader>Loja de Hardware</StyleHeader>
      <StyledList>
        {products.map((product) => {
          return (
            <StyledLi key={product.id}>
              <Link href={`/store/${product.id}`}>
                <a>{product.title}</a>
              </Link>
              <StyledImg src={product.image} />
            </StyledLi>
          );
        })}
      </StyledList>
    </StyledContainer>
  );
};

export default Index;
