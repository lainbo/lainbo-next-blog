// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '@/blog.config'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const stylesheetsCriteria = ['googleapis.com/css', 'font.alnk.cn', 's1.hdslb.com'];
    return (
            <Html lang={BLOG.LANG}>
                <Head>
                    <link rel='icon' href={`${BLOG.BLOG_FAVICON}`} />
                    {/* 预加载字体 */}
                    {BLOG.FONT_AWESOME && <>
                        <link rel='preload' href={BLOG.FONT_AWESOME} as="style" crossOrigin="anonymous" />
                        <link rel="stylesheet" href={BLOG.FONT_AWESOME} crossOrigin="anonymous" referrerPolicy="no-referrer" />
                    </>}

                    {BLOG.FONT_URL?.map((fontUrl, index) => {
                      const isStylesheet = fontUrl.endsWith('.css') || stylesheetsCriteria.some(criteria => fontUrl.includes(criteria));

                      if (isStylesheet) {
                        return <link key={index} rel="stylesheet" href={fontUrl} />;
                      } else {
                        return <link key={index} rel="preload" href={fontUrl} as="font" type="font/woff2" crossOrigin="anonymous" />;
                      }
                    })}
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
