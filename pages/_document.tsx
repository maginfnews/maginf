import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Favicon MAGINF */}
        <link rel="icon" href="/favicon-of.ico" />
        <link rel="shortcut icon" href="/favicon-of.ico" />
        <link rel="apple-touch-icon" href="/favicon-of.ico" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZN8LKRES3R"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZN8LKRES3R');
            `,
          }}
        />
        
        {/* Meta tags essenciais */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#e35300" />
        <meta name="description" content="MAGINF Tecnologia — MSP e suporte técnico para empresas. Monitoramento 24/7, CFTV, cloud e infraestrutura com atendimento local. Fale com um consultor." />
        <meta name="keywords" content="msp, suporte técnico, managed services, backup em nuvem, cftv, redes wi-fi, microsoft 365, aws, Maginf Tecnologia" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    )
  }
}

export default MyDocument
