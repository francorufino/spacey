import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <link rel="icon" href="/rocket.ico" /> Use .ico format */}
        {/* Or use .png format */}
        <link rel="icon" type="image/png" href="/rocket.png" sizes="32x32" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
