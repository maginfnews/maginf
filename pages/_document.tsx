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
        
        {/* Meta tags */}
        <meta name="theme-color" content="#e35300" />
        <meta name="description" content="MAGINF Tecnologia — MSP e suporte técnico para empresas. Monitoramento 24/7, CFTV, cloud e infraestrutura com atendimento local. Fale com um consultor." />
        <meta name="keywords" content="msp, suporte técnico, managed services, backup em nuvem, cftv, redes wi-fi, microsoft 365, aws, Maginf Tecnologia" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
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
