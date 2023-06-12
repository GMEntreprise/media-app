// Importer les types NextApiRequest et NextApiResponse de Next.js
import { NextApiRequest, NextApiResponse } from "next";

// Importer l'instance Prisma
import prisma from "@/libs/prismadb";

// Définir la fonction handler comme une fonction asynchrone
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifier que la méthode de la requête est GET, sinon renvoyer une réponse avec le statut 405 (Méthode non autorisée)
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Récupérer la valeur du paramètre userId depuis l'objet req.query
    const { userId } = req.query;
    console.log(userId);

    // Vérifier si userId est absent ou n'est pas une chaîne de caractères, sinon renvoyer une erreur avec le message "Invalid Id"
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    // Rechercher un utilisateur existant dans la base de données en utilisant l'ID fourni
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Compter le nombre d'abonnés (followers) pour l'utilisateur
    const followerCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    // Renvoyer une réponse avec le statut 200 (OK) et les données de l'utilisateur existant ainsi que le nombre d'abonnés
    return res.status(200).json({ ...existingUser, followerCount });
  } catch (error) {
    // Afficher l'erreur dans la console
    console.log(error);
    // Renvoyer une réponse avec le statut 400 (Bad Request)
    return res.status(400).end();
  }
}
