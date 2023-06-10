// Importation du hook useSWR de la bibliothèque SWR
import useSWR from "swr";
// Importation de la fonction fetcher depuis le fichier "@/libs/fetcher"
import fetcher from "@/libs/fetcher";

// Définition du hook useCurrentUser
const useCurrentUser = () => {
  // Utilisation du hook useSWR pour effectuer une requête GET à l'API "/api/current" en utilisant la fonction fetcher
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  // Retourne un objet contenant les données, l'erreur, l'état de chargement et la fonction mutate
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

// Exportation du hook useCurrentUser
export default useCurrentUser;
