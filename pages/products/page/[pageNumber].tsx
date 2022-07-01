import { Pagination } from "components/Pagination";
import ProductListItem from "components/ProductListItem";
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from "next";

export const ProductsPageSSG = ({ data, numberOfProducts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-col items-center py-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
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
      <Pagination numberOfProducts={numberOfProducts} />
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
  let numberOfProducts = await recursiveFetch(0, 0);
  const currentOffset = (parseInt(params?.pageNumber) - 1) * 25;
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=${currentOffset}`);
  const data: StoreApiResponse[] = await res.json();
  if (!data.length) {
    return {
      props: {},
      notFound: true,
    };
  }
  return {
    props: {
      data,
      numberOfProducts: numberOfProducts,
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
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=250&offset=0`);
  const data: StoreApiResponse[] = await res.json();
  const numberOfPagesForFirstRender = data.length / 25;
  return {
    paths: Array.from({ length: numberOfPagesForFirstRender }, (_, i) => {
      return {
        params: {
          pageNumber: (i + 1).toString(),
        },
      };
    }),
    fallback: "blocking",
  };
};

const recursiveFetch = async (offset: number, currentRecords: number): Promise<number> => {
  console.log(offset);
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=1000&offset=${offset.toString()}`);
  const data: StoreApiResponse[] = await res.json();
  let records = currentRecords;
  if (res.status === 200 && data.length > 0) {
    records += data.length;
  } else {
    return records;
  }
  return recursiveFetch(offset + 1000, records);
};
