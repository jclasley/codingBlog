import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Projects() {
  return (
    <>
      <Layout>
        <Head>
          <title>Projects</title>
        </Head>
        <h1>
          My side-projects
        </h1>
        <h2><Link href='https://awesomeasteroids.herokuapp.com'><a>Awesome Asteroids</a></Link></h2>
        <div>Built on the MERN stack, this website utilizes NASA's near-earth-object API to retrieve and store information about the asteroid's nearest earth for a given date. The size and distance of the asteroids are logarithmically proportional to the true data, and an asteroid's orbital period is linearly proportional. Check out zen mode for the ultimate immersive experience! It's deployed on Heroku's free tier, so I apologize about initial load times. 
        </div>
        <h2><Link href='https://github.com/jclasley/LoveQuick'><a>LoveQuick</a></Link></h2>
        <div>The one that started it all. A native iOS app designed for staying in touch with your friends and family
        with minimal effort. Just a quick way to drop a line and say you're thinking about them.
        </div>
        <h2><Link href='https://github.com/jclasley/ReactiveLevel'><a>Reactive level</a></Link></h2>
        <div>
          Built as a way to learn RxSwift and the reactive programming paradigm, the reactive level is simply that -- a level
           that displays offset on two axes based on device attitude. 
        </div>
      </Layout>
    </>
        
  )
}