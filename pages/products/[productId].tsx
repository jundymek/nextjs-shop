import { gql } from "@apollo/client";
import { ProductDetails } from "components/product/Product";
import {
  GetProductDetailsBySlugDocument,
  GetProductDetailsBySlugQuery,
  GetProductDetailsBySlugQueryVariables,
  GetProductsSlugsDocument,
  GetProductsSlugsQuery,
} from "generated/graphql";
import { apolloClient } from "graphql/apolloClient";
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";

const ProductIdPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(data);
  if (!data || !data?.product) {
    return <div>Error</div>;
  }
  return (
    <ProductDetails
      product={{
        slug: data.product.slug,
        title: data.product.name,
        description: data.product.description,
        longDescription: data.longDescription,
        thumbnailUrl: data.product.images[0].url,
        thumbnailAlt: data.product.name,
        rating:
          data.product.reviews.reduce((a, b) => (b.rating ? a + b.rating : 0), 0) / data.product.reviews.length || 0,
      }}
    />
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductsSlugsQuery>({
    query: GetProductsSlugsDocument,
  });
  return {
    paths: data.products.map((product) => {
      return {
        params: {
          productId: product.slug,
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
  const { data } = await apolloClient.query<GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables>({
    variables: {
      slug: params.productId,
    },
    query: GetProductDetailsBySlugDocument,
  });

  if (!data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data,
        longDescription: await serialize(data.product.description),
      },
    },
  };
};
