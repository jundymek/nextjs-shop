import Image from "next/image";
import { useRouter } from "next/router";
import { Rating } from "./Rating";
import { NextSeo } from "next-seo";
import { NextMarkdown } from "../NextMarkdown";
import { MarkdownResult } from "types";
import { GetProductDetailsBySlugQuery, useGetProductReviewsBySlugQuery } from "generated/graphql";
import { useState } from "react";
import { ProductReviewForm } from "./review/ProductReviewForm";
import { ProductReviews } from "./review/ProductReviews";

export interface ProductDetails {
  slug: string;
  title: string;
  description: string;
  longDescription: MarkdownResult;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

interface ProductDetailsProps {
  product: ProductDetails;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [isProductReviewsOpen, setIsProductReviewsOpen] = useState(false);
  const reviews = useGetProductReviewsBySlugQuery({
    variables: {
      slug: product.slug,
    },
  });
  console.log(reviews);
  console.log(product);
  const router = useRouter();
  if (!product) {
    return <div>Error</div>;
  }
  return (
    <>
      <NextSeo
        title={product.title}
        description={product.description}
        canonical={`https://nextjs-shop-eight.vercel.app/products/${product.slug}`}
        openGraph={{
          url: `https://nextjs-shop-eight.vercel.app/products/${product.slug}`,
          title: product.title,
          description: product.description,
          images: [
            {
              url: product.thumbnailUrl,
              alt: product.title,
              type: "image/jpeg",
            },
          ],
          site_name: "Next sklep",
        }}
      />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-col items-center bg-white shadow-sm relative">
            <div className="flex flex-col md:flex-row">
              <Image
                width={500}
                height={500}
                className="rounded object-contain"
                src={product.thumbnailUrl}
                alt={product.title}
              />
              <div className="lg:w-1/2 w-full p-6 lg:px-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                <div className="flex mb-4">
                  <Rating rating={5} setIsProductReviewsOpen={setIsProductReviewsOpen} />
                </div>
                <article className="prose">{/* <NextMarkdown>{product.description}</NextMarkdown> */}</article>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Button
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {isProductReviewsOpen && (
              <>
                <ProductReviews productSlug={product.slug} />
                <ProductReviewForm productSlug={product.slug} />
              </>
            )}

            <button
              type="button"
              onClick={() => router.back()}
              className="absolute -bottom-20 right-0  flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded"
            >
              Back to products
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
