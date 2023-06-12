// Import des modules nécessaires pour le handler de l'API
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"; // Import de la librairie prisma

// Définition de la fonction handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérification de la méthode HTTP utilisée, si différente de GET, renvoie une réponse d'erreur 405 (Méthode non autorisée)
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Utilisation de la librairie prisma pour récupérer une liste d'utilisateurs de la base de données
    const users = await prisma?.user.findMany({
      orderBy: {
        createAt: "desc",
      },
    });
    // Renvoi de la réponse HTTP avec un statut 200 (Succès) et les utilisateurs au format JSON
    return res.status(200).json(users);
  } catch (error) {
    // En cas d'erreur, affichage de l'erreur dans la console et renvoi d'une réponse d'erreur 400 (Requête incorrecte)
    console.log(error);
    return res.status(400).end();
  }
}
