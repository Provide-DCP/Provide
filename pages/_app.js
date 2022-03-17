import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../src/components/Layouts/Navbar';
import { useRouter } from 'next/router';
import { Sidebar } from '../src/components/Provider/Sidebar';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  useEffect(() => {
    AOS.init();
  });

  return (
    <SessionProvider session={session}>
      {router.pathname.split('/')[1] !== 'auth' &&
        router.pathname !== '/' &&
        router.pathname.search('provider') === -1 && <Navbar />}
      {router.pathname.split('/')[1] !== 'auth' &&
        router.pathname !== '/' &&
        router.pathname.search('provider') !== -1 && <Sidebar />}
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
}
