import { Pagination } from "components/Pagination";
import ProductListItem from "components/ProductListItem";
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from "next";

export const ProductsPageSSG = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-col items-center py-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((product) => {
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

export default ProductsPageSSG;

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ pageNumber: string }>) => {
  if (!params?.pageNumber) {
    return {
      props: {},
      notFound: true,
    };
  }
  const currentOffset = (parseInt(params?.pageNumber) - 1) * 25;
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=${currentOffset}`);
  const data: StoreApiResponse[] = await res.json();
  console.log(data);
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
