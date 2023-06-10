// Importation du module de gestion de l'authentification côté serveur
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

// Fonction handler pour l'API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérification si la méthode de requête est "GET"
  if (req.method !== "GET") {
    // Si la méthode est "GET", cela signifie que la requête n'est pas autorisée pour cette route.
    // Le gestionnaire de requêtes renvoie une réponse avec le code d'état 405 (Method Not Allowed).
    return res.status(405).end();
  }

  try {
    // Appel de la fonction serverAuth pour vérifier l'authentification de l'utilisateur
    const { currentUser } = await serverAuth(req);

    // Si l'authentification est réussie, le gestionnaire de requêtes renvoie une réponse avec le code d'état 200 et renvoie l'objet de l'utilisateur courant sous forme de JSON.
    return res.status(200).json(currentUser);
  } catch (error) {
    // En cas d'erreur, le gestionnaire de requêtes affiche l'erreur dans la console et renvoie une réponse avec le code d'état 400 (Bad Request).
    console.log(error);
    return res.status(400).end();
  }
}
