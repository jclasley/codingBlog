import "../styles/global.css";
import {GTMPageView} from '../utils/gtm';
import { Router } from 'next/router';
import {useEffect} from 'react';
import '../styles/prism.css';
export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   const handleChangeRoute = (url) => GTMPageView(url);
  //   Router.events.on('routeChangeComplete', handleChangeRoute);
  //   return () => {
  //     Router.events.off('routeChangeComplete', handleChangeRoute);
  //   };
  // }, [])
  return <Component {...pageProps} />;
}
