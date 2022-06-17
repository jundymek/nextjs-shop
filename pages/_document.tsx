import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pl" className="overflow-y-scroll">
      <Head />
      <body className="bg-gray-50 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
