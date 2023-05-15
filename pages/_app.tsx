// Librairy
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Components
import { Layout } from "../components/UI/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Modal isOpen title="Jesus" actionLabel="Envoyer" /> */}

      <Layout>
        {" "}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
