import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";


const name = "Jon Lasley";
export const siteTitle = "Jon's Journeys";

export default function Layout({ children, home, link="/" }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="description"
          content="Jon Lasley's blog on the adventures through Hack Reactor's SEI bootcamp, as well as side projects along the way"
        />
        <meta name="og:title" content={siteTitle} />
        <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Courgette&family=Lobster&display=swap" rel="stylesheet"></link>
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      {home || (
          <>
          <div className={utilStyles.image}>
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
          </div>
          </>
        )}
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href={link} prefetch={false}>
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}

