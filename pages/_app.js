import '../styles/globals.css'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Notification from '../components/Notification'


function MyApp({ Component, pageProps }) {

  return (
      <div className={styles.container}>
          <Head>
            <title>Punktur</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Newsreader&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout>
            <main>
              <Notification />
              <Component {...pageProps} />
            </main>
          </Layout>
      </div>

  )
}

export default MyApp
