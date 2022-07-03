import Head from "next/head";
import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Nasz Sklep</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Nasz sklep" />
      </Head>
      <Header />
      <main className="container mx-auto flex-grow flex flex-col items-center justify-center"> {children} </main>
      <Footer />
    </div>
  );
}
