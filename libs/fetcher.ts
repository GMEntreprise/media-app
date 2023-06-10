// Importation de la bibliothèque Axios
import axios from "axios";

// Définition de la fonction fetcher qui prend une URL en paramètre
const fetcher = (url: string) =>
  // Utilisation de la méthode get d'Axios pour effectuer une requête GET vers l'URL spécifiée
  axios.get(url).then((res) => res.data);

// Exportation de la fonction fetcher
export default fetcher;
