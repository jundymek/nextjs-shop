import { gql, useQuery } from "@apollo/client";
import { NewsletterForm } from "components/NewsletterForm";
import {
  CreateProductReviewDocument,
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables,
  useCreateProductReviewMutation,
} from "generated/graphql";
import { apolloClient } from "graphql/apolloClient";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Footer } from "../components/Footer";

import { Main } from "../components/Main";

const Home = () => {
  return (
    <Main>
      <section className="text-gray-600 body-font">
        <NewsletterForm />
        <div className="container mx-auto flex px-5 pt-24 items-center justify-center flex-col">
          <Image
            width={800}
            height={600}
            alt="hero"
            src="/hero.jpeg"
            className="w-full lg:max-w-2xl h-full object-contain"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl my-4 font-medium text-gray-900">
              Microdosing synth tattooed vexillologist
            </h1>
            <p className="mb-8 leading-relaxed">
              Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust
              fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over
              meditation PBR&amp;B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/products/page/1">
            <a className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Go to products
            </a>
          </Link>
        </div>
      </section>
    </Main>
  );
};

export default Home;
