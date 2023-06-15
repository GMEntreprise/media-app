// Importation Librairie
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
// Importation des composants
import { Layout } from "../components/UI/Layout";
import { LoginModal } from "@/components/Modals/LoginModal";
import { RegisterModal } from "@/components/Modals/RegisterModal";
import EditModal from "@/components/Modals/EditModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Fournit la session à tous les composants qui utilisent le hook useSession */}
      <SessionProvider session={pageProps.session}>
        {/* Affiche les notifications Toast */}
        <Toaster />
        {/* Affiche le modal d'inscription */}

        <EditModal />
        {/* Affiche le modal Edit */}

        <RegisterModal />
        {/* Affiche le modal de connexion */}
        <LoginModal />
        {/* Utilise le composant Layout pour entourer le contenu */}
        <Layout>
          {/* Rend le composant passé en tant que prop */}
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
