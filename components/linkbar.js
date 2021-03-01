import Link from 'next/link';
import linkHeaderStyles from '../styles/linkHeader.module.css';
export default function Linkbar ({links}) {
  return (
    <section className={`${linkHeaderStyles.container}`}>
      {links.map((link, n) => {
        return (<>
          <span style={{gridArea: `1 / ${n + 1}`}} className={n > 0 ? linkHeaderStyles.mid : ''} />
          <Link href={link.src}><a style={{ gridArea: `1 / ${n + 1}` }}>{link.name}</a></Link></>)
            
      })}
    </section>
  )
};