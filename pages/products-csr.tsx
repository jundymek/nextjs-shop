import { ProductDetails } from "components/Product";
import { InferGetStaticPropsType } from "next";
import { useQuery } from "react-query";

const getProducts = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  const data: StoreApiResponse[] = await res.json();
  console.log(data);
  return data;
};

const ProductsCSRPage = () => {
  const result = useQuery("products", getProducts);

  if (result.isLoading) {
    return <p>Loading...</p>;
  }
  if (!result.data || result.error) {
    return <p>Error</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {result.data.map((product) => {
        return (
          <li key={product.id} className="shadow-sm border">
            <ProductDetails
              data={{
                id: product.id,
                title: product.title,
                description: product.description,
                thumbnailUrl: product.image,
                thumbnailAlt: product.title,
                rating: product.rating.rate,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsCSRPage;

// export const getStaticProps = async () => {
//   const res = await fetch(`https://fakestoreapi.com/products/`);
//   const data: StoreApiResponse[] = await res.json();
//   console.log(data);
//   return {
//     props: {
//       data,
//     },
//   };
// };

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
