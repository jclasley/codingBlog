import Head from "next/head";
import Link from "next/link";
import Date from '../components/date'
import Linkbar from '../components/linkbar.js'
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from '../lib/posts'


export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
  
}

export default function Home({ allPostsData }) {
  return (
    <div className="container">
      <Head>
        <title>Jon's Journeys</title>
        <link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Courgette&family=Lobster&display=swap" rel="stylesheet"></link>
      </Head>
      
     
        <header className='title'>
          <h3>
            Jon's Journeys
          </h3>
        </header>
       <Linkbar links={[
         {
           src: '/algo',
           name: 'Algo a Day'
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
         }
       ]} />

      <section className={`flexContainer ${utilStyles.headingMd} ${utilStyles.padding1px}`}>
       <h2 className={utilStyles.headingLg}>A note from me</h2>
       <div>
         While I focus on the job hunt, I will not be updating my blog and will instead put all my efforts into my <a href='/algo' style={{color: 'blue'}}>Algorithm a Day</a> series. Thank you for visiting my site, and I hope you enjoy watching my journey as a software engineer!
       </div>
      </section>
      <section className={`flexContainer ${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog posts</h2>
        <div className={utilStyles.cardHolder}>
          {allPostsData.map(({ id, date, title, excerpt }) => (
            <div className={utilStyles.card} key={id}>
              <div className={utilStyles.cardContent}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
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

      <style jsx>{`
        .container {
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          grid-row: 1;
          grid-column: 2;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
