import Link from "next/link";

const Products = () => {
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
    { id: 5, name: "Product 5" },
    { id: 6, name: "Product 6" },
  ];
  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Link href={`/examples/products/${product.id}`}>
              <a>{product.name}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Products;
