// Librairy
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Components
import { Layout } from "../components/UI/Layout";
import { LoginModal } from "@/components/Modals/LoginModal";
import { RegisterModal } from "@/components/Modals/RegisterModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <Layout>
        {" "}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
