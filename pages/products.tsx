import { gql } from "@apollo/client";
import { Pagination } from "components/Pagination";
import { ProductDetails } from "components/Product";
import ProductListItem from "components/ProductListItem";
import { GetProductsDocument, GetProductsQuery, useGetProductsQuery } from "generated/graphql";
import { apolloClient } from "graphql/apolloClient";
import { InferGetStaticPropsType } from "next";

const getProducts = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products/`);
  const data: StoreApiResponse[] = await res.json();
  console.log(data);
  return data;
};

const ProductsPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col items-center py-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.products.map((product) => {
          return (
            <li key={product.slug} className="shadow-sm border">
              <ProductListItem
                data={{
                  id: product.slug,
                  title: product.name,
                  thumbnailUrl: product.images[0].url,
                  thumbnailAlt: product.name,
                }}
              />
            </li>
          );
        })}
      </ul>
      {/* <Pagination /> */}
    </div>
  );
};

export default ProductsPage;

export const getStaticProps = async () => {
  // const res = await fetch(`https://naszsklep-api.vercel.app/api/products/`);
  // const data: StoreApiResponse[] = await res.json();
  const { data } = await apolloClient.query<GetProductsQuery>({
    query: GetProductsDocument,
  });
  return {
    props: {
      data,
    },
  };
};

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
