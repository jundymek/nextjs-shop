import { Pagination } from "components/Pagination";
import ProductListItem from "components/ProductListItem";
import { GetStaticPathsResult } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const getProducts = async (offset: number) => {
  console.log(offset, "OFFSET in getProducts");
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`);
  const data: StoreApiResponse[] = await res.json();
  console.log(data);
  return data;
};

const ProductsPageCSR = () => {
  const router = useRouter();
  const currentPage = parseInt(typeof router.query.pageNumber === "string" ? router.query.pageNumber : "1");
  const currentOffset = (currentPage - 1) * 25;
  const result = useQuery(["products", currentOffset], () => getProducts(currentOffset));

  if (result.isLoading) {
    return <p>Loading...</p>;
  }
  if (!result.data || result.error) {
    return <p>Error</p>;
  }
  return (
    <div className="flex flex-col items-center py-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {result.data.map((product) => {
          return (
            <li key={product.id} className="shadow-sm border">
              <ProductListItem
                data={{
                  id: product.id,
                  title: product.title,
                  thumbnailUrl: product.image,
                  thumbnailAlt: product.title,
                }}
              />
            </li>
          );
        })}
      </ul>
      <Pagination />
    </div>
  );
};

export default ProductsPageCSR;

export const getStaticProps = async () => {
  return {
    props: {},
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

export const getStaticPaths = async (): Promise<GetStaticPathsResult<import("querystring").ParsedUrlQuery>> => {
  return {
    paths: Array.from({ length: 10 }, (_, i) => {
      return {
        params: {
          pageNumber: (i + 1).toString(),
        },
      };
    }),
    fallback: false,
  };
};
