import { Pagination } from "components/Pagination";
import ProductListItem from "components/ProductListItem";
import {
  GetProductsQuery,
  GetProductsDocument,
  GetProductsPaginateQuery,
  GetProductsPaginateDocument,
} from "generated/graphql";
import { apolloClient } from "graphql/apolloClient";
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from "next";

export const ProductsPageSSG = ({ data, numberOfProducts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(data);
  if (!data) {
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-col items-center py-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {data.productsConnection.edges.map((product) => {
          return (
            <li key={product.node.id} className="shadow-sm border">
              <ProductListItem
                data={{
                  slug: product.node.slug,
                  title: product.node.name,
                  thumbnailUrl: product.node.images[0].url,
                  thumbnailAlt: product.node.name,
                }}
              />
            </li>
          );
        })}
      </ul>
      <Pagination
        numberOfProducts={numberOfProducts}
        hasNextPage={data.productsConnection.pageInfo.hasNextPage}
        hasPreviousPage={data.productsConnection.pageInfo.hasPreviousPage}
      />
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
  // let numberOfProducts = await recursiveFetch(0, 0);
  const currentOffset = (parseInt(params?.pageNumber) - 1) * 2;
  console.log(currentOffset, "currentOffset");
  const { data } = await apolloClient.query<GetProductsPaginateQuery>({
    query: GetProductsPaginateDocument,
    variables: {
      offset: currentOffset,
    },
  });
  return {
    props: {
      data,
      numberOfProducts: 20,
    },
  };
};

interface StoreApiResponse {
  id: number;
  slug: string;
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
  // const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=250&offset=0`);
  // const data: StoreApiResponse[] = await res.json();
  // const numberOfPagesForFirstRender = data.length / 25;
  const { data } = await apolloClient.query<GetProductsPaginateQuery>({
    query: GetProductsPaginateDocument,
    variables: {
      offset: 0,
    },
  });
  return {
    paths: Array.from({ length: 1 }, (_, i) => {
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
