import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import { getAllAlgoIds, getAlgoData } from '../../lib/algos'
import utilStyles from '../../styles/utils.module.css'


export default function Algo({ postData }) {
  return (
    <Layout link="/algo">
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.date}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllAlgoIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getAlgoData(params.id)
  return {
    props: {
      postData
    }
  }
}