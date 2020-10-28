import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function About() {
  return (
    <>
      <Layout>
        <Head>
          <title>About me</title>
        </Head>
        <h1>
          About Jon
        </h1>
        <div>
          Hello and welcome! My name is Jon Lasley, and I'm currently a software engineering student with Hack Reactor. 
          What started as purely a passion project has blossomed into a full-blown love of all things software-adjacent. I am overjoyed 
          at the opportunity to learn as much as possible and grow as an engineer. 
          This site is first and foremost a blog about all my experiences throughout the program. It's written using next.js, and I'm excited to
          learn more as I progress! Check back later to see my progress.
        </div>
      </Layout>
    </>
        
  )
}