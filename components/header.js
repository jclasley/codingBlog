import Head from 'next/head';
import layoutStyles from "./layout.module.css";
import styles from '../styles/header.module.css';

const Header = ({ title }) => (
  <div className={`${layoutStyles.container}, ${styles.background}`}>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Courgette&family=Lobster&display=swap" rel="stylesheet"></link>
    </Head>
    <div className={styles.titleBacking}>
      <div className={styles.title}>{title}</div>
    </div>
  </div>
)

export default Header;