import Head from 'next/head';
import Layout from '../components/layout'
import Link from 'next/link'
import { getSortedAlgoData } from '../lib/algos'
import utilStyles from "../styles/utils.module.css";
import moment from 'moment';

export async function getStaticProps() {
  const allAlgoData = getSortedAlgoData()
  return {
    props: {
      allAlgoData
    }
  }
}

export default function Algo({ allAlgoData }) {
  return (
    <>
      <Head>
        <title>Jon's Journeys</title>
        <link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Courgette&family=Lobster&display=swap" rel="stylesheet"></link>
      </Head>
      <Layout home>
        <h1>An Algo a Day</h1>
        <h3>Exploring algorithms in JavaScript, Clojure, and Go</h3>
        <div>
          The goal of this project is to explore a different algorithm every day, try it out in JavaScript, Clojure, and Go, and record my experiences doing so. I will discuss use cases, constructing the algorithm in different languages, and things I learned throughout the experience.
        </div>
        <h2>Algorithms</h2>
        <section className={`flexContainer ${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <div className={utilStyles.cardHolder}>
            {allAlgoData.map(({ id, date, title, excerpt }) => (
              <div className={utilStyles.card} key={id}>
                <div className={utilStyles.cardContent}>
                  <Link href={`/algos/${id}`}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  <small style={{
                    color: "#999",
                    fontSize: "0.6rem;"}}>
                    {moment(date).fromNow()}
                  </small>
                  <br />
                  <p className={utilStyles.excerpt}>
                    {excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  )
}