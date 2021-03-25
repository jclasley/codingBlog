import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDoc extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <!-- Google Tag Manager --> */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-163152822-1"></script>

          <script dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-163152822-1');`}}></script>
          {/* <!-- End Google Tag Manager --> */}

          {/* Google fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Courgette&family=Lobster&display=swap" rel="stylesheet"></link>

            {/* meta tags */}
          <meta property="og:image" content="../public/images/Screen Shot 2021-03-25 at 2.24.14 PM.png" />

        </Head>
        <body>

         
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDoc;