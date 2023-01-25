import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <title>OpenIO - AI-Powered Picture Restoration</title>
          <meta name="description" content="OpenIO is a company that uses AI to restore low quality pictures and bring them back to their original brilliance. Our state-of-the-art technology ensures that your memories are preserved in the best possible way." />
          <meta name="keywords" content="picture restoration, AI, low quality, high quality, memories, technology, OpenIO, photo restoration, AI image processing, digital image enhancement, picture enhancement, image repair, low resolution to high resolution, image upscaling, photo editing, memory preservation, digital archiving, image retouching, old photo restoration" />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://www.getopenio.com/" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="OpenIO - AI-Powered Picture Restoration" />
          <meta property="og:description" content="OpenIO is a company that uses AI to restore low quality pictures and bring them back to their original brilliance. Our state-of-the-art technology ensures that your memories are preserved in the best possible way." />
          <meta property="og:url" content="https://www.getopenio.com/" />
          <meta property="og:site_name" content="OpenIO" />
          <meta property="og:image" content="https://www.getopenio.com/img/og-image.jpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
