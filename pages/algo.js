import Head from 'next/head';
import Layout from '../components/layout'
import Link from 'next/link'
import { getSortedAlgoData } from '../lib/algos'
import utilStyles from "../styles/utils.module.css";
import moment from 'moment';
import Header from '../components/header';
import Linkbar from '../components/linkbar';
import { util } from 'prismjs';

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
    <div className="container">
      <Head>
        <title>Jon's Journeys</title>
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-S21C5QRQ4C"></script> */}
{/*          */}
      </Head>
      <Header title="Algo a Day" />
      <Linkbar links={[
        {
          src: '/',
          name: 'Home'
        },
        {
          src: '/projects',
          name: 'Projects'
        },
        {
          src: 'https://www.github.com/jclasley',
          name: 'Github'
        },
        {
          src: '/about',
          name: 'About'
        }]
       } />
      <section className={`flexContainer ${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h3 className={utilStyles.headingLg}>Exploring algorithms in JavaScript and Go</h3>
        <div>
          The goal of this project is to explore a different algorithm every day, try it out in JavaScript <strike>Clojure</strike> and Go, and record my experiences doing so. I will discuss use cases, constructing the algorithm in different languages, and things I learned throughout the experience.<br />

          Update: Due to the time involved in completing the algorithms in multiple languages, I have restricted my algorithms to JavaScript and Go, so that I can be more consistent in my posting as well as have a productive job search each day. Thanks for checking back in!
        </div>
      </section>
      <section className={`flexContainer ${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={`${utilStyles.headingLg}`}>Algorithms</h2>
          <div className={utilStyles.cardHolder}>
            {allAlgoData.map(({ id, date, title, excerpt }) => (
              <div className={utilStyles.card} key={id}>
                <div className={utilStyles.cardContent}>
                  <Link href={`/algos/${id}`}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  <small className={utilStyles.date}>
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
    </div>
  )
}