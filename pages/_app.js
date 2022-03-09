import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../src/components/Layouts/Navbar';
import { useRouter } from 'next/router';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      {router.pathname.split('/')[1] !== 'auth' && router.pathname !== '/' && (
        <Navbar />
      )}
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
}
