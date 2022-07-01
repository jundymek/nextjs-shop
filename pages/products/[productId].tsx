import { ProductDetails } from "components/Product";
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from "next";

const ProductIdPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Error</div>;
  }
  return (
    <ProductDetails
      data={{
        id: data.id,
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        thumbnailUrl: data.image,
        thumbnailAlt: data.title,
        rating: data.rating.rate,
      }}
    />
  );
};

export default ProductIdPage;

export const getStaticPaths = async (): Promise<GetStaticPathsResult<import("querystring").ParsedUrlQuery>> => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=0`);
  const data: StoreApiResponse[] = await res.json();
  return {
    paths: data.slice(0, 1).map((product) => {
      return {
        params: {
          productId: product.id.toString(),
        },
      };
    }),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${params?.productId}`);
  const data: StoreApiResponse | null = await res.json();
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
  longDescription: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
