import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";


const name = "Jon Lasley";
export const siteTitle = "Jon's Journeys";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="description"
          content="Jon Lasley's blog on the adventures through Hack Reactor's SEI bootcamp, as well as side projects along the way"
        />
        <meta name="og:title" content={siteTitle} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/cropped selife.jpeg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/cropped selife.jpeg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}

