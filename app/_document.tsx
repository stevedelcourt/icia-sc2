import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.hsforms.net; frame-src 'self' https://www.openstreetmap.org; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.notion.com; media-src 'self' https:; worker-src 'self' blob:;" />
          <link rel="icon" href="/MariusIA-logo-monogram.png" />
        </Head>
        <body className="antialiased bg-transparent text-text" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}