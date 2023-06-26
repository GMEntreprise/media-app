// Importation du hook useSWR de la bibliothèque SWR
import useSWR from "swr";

// Importation de la fonction fetcher depuis le fichier "@/libs/fetcher"
import fetcher from "@/libs/fetcher";

/**Lorsqu'une mutation est effectuée, cela signifie qu'une action a été réalisée qui a potentiellement modifié les données. La fonction mutate permet de mettre à jour les données en cache avec les nouvelles modifications. */

// Définition du hook usePosts
const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?/userId=${userId}` : "/api/posts";

  // Utilisation du hook useSWR pour effectuer une requête GET à l'API "/api/users/${userId}" en utilisant la fonction fetcher
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  // Retourne un objet contenant les données, l'erreur, l'état de chargement et la fonction mutate
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

// Exportation du hook usePosts
export default usePosts;
