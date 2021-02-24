import Link from 'next/link';
import linkHeaderStyles from '../styles/linkHeader.module.css';
export default function Linkbar ({links}) {
  return (
    <section className={`linkbar ${linkHeaderStyles.container}`}>
      {links.map(link => {
        return <Link href={link.src}><a>{link.name}</a></Link>
      })}
    </section>
  )
};