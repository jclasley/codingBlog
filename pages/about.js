import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import Header from '../components/header'
import Linkbar from '../components/linkbar';

export default function About() {
  return (
    <>
        <Head>
          <title>About me</title>
        </Head>
        <Header title="About" />
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
        <Layout>
          <h1>
            About Jon
          </h1>
          <div>
            Hello and welcome! My name is Jon Lasley, and I'm a software engineer who loves solving problems.
            My love for software engineering started as a desire to automate my mundane job functions in VBA while in my previous career, turned into a passion project in C#, and is now a full-blown love of all things software.
            <br />
            <br />
            I am overjoyed at the opportunity to learn as much as possible and grow as an engineer. My current language focuses are in JavaScript, Clojure, and Go. I am having a blast learning Clojure and Go, as they are very different from my most mastered language, JavaScript.
            <br />
            I love to find clean and beautiful solutions to difficult and messy problems. Learning and growing as an engineer is what keeps me coming back day after day and what fuels my passion.
            <br />
            <br />
            This site started as a blog to detail my experience through a software engineering immersive, but has transitioned into a learning and educational platform, focused mainly on my <a href='/algo'>Algo a Day series</a>. It's written using next.js, and I've thoroughly enjoyed the experience of creating a site using it, as compared to the messiness that is the traditional React, Express, and Webpack stack! Check back later to see my progress.
          </div>
      </Layout>
    </>
        
  )
}