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
          <script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l] = w[l] || []{'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5CXHDTB');`}}></script>
          {/* <!-- End Google Tag Manager --> */}
          <script dangerouslySetInnerHTML={{
            __html: 'console.log("hello")'
          }}></script>
          {/* Google fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Courgette&family=Lobster&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5CXHDTB"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}

         
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;