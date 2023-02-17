import { getCssText } from "@jerp-ignite-ui/react";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      
      <body>
        <Main />
        <NextScript />

        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </body>
    </Html>
  )
}
