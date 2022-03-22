import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "../src/components/Layouts/Sidebar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "../src/components/Layouts/Navbar";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  useEffect(() => {
    AOS.init();
  });

  return (
    <SessionProvider session={session}>
      {router.pathname.split("/")[1] !== "auth" && <Navbar session={session} />}
      <div className={router.pathname.split("/")[1] === "auth" ? "mt-0" : "mt-[11vh]"}>
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </SessionProvider>
  );
}
