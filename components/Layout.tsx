import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header />
      <main className="flex-grow flex"> {children} </main>
      <Footer />
    </div>
  );
}
