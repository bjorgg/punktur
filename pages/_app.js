import '../styles/globals.css'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import {DataProvider} from '../components/Context';

function MyApp({ Component, pageProps }) {

  return (
    <div className={styles.container}>
        <Head>
          <title>Punktur</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <main>
        <DataProvider>
            <Component {...pageProps} />
        </DataProvider>
          </main>
        </Layout>
      </div>

  )
}

export default MyApp
