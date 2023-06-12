// Importation du hook useSWR de la bibliothèque SWR
import useSWR from "swr";
// Importation de la fonction fetcher depuis le fichier "@/libs/fetcher"
import fetcher from "@/libs/fetcher";

// Définition du hook useUser
const useUser = (userId: string) => {
  // Utilisation du hook useSWR pour effectuer une requête GET à l'API "/api/users/${userId}" en utilisant la fonction fetcher
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  // Retourne un objet contenant les données, l'erreur, l'état de chargement et la fonction mutate
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

// Exportation du hook useUser
export default useUser;
