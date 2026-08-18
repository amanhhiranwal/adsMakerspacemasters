import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/images/common/fav.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..900;1,300..900&family=Work+Sans:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased selection:bg-neutral-900 selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
