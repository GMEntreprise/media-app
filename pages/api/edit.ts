import serverAuth from "@/libs/serverAuth"; // Importe le module `serverAuth` depuis le chemin "@/libs/serverAuth"
import { NextApiRequest, NextApiResponse } from "next"; // Importe les types NextApiRequest et NextApiResponse depuis le module "next"
import prisma from "@/libs/prismadb"; // Importe l'instance Prisma depuis le chemin "@/libs/prismadb"

export default async function handler(
  req: NextApiRequest, // Représente la demande entrante de l'API
  res: NextApiResponse // Représente la réponse de l'API
) {
  if (req.method !== "PATH") {
    // Vérifie si la méthode de la requête n'est pas "PATCH"
    return res.status(405).end(); // Retourne une réponse avec le code d'état 405 (Méthode non autorisée) et termine la fonction
  }

  try {
    const { currentUser } = await serverAuth(req); // Exécute la fonction serverAuth pour authentifier l'utilisateur et récupère le currentUser
    const { name, username, bio, profileImage, coverImage } = req.body; // Récupère les valeurs des champs name, username, bio, profileImage et coverImage depuis le corps de la requête

    if (!name || !username) {
      // Vérifie si les champs name et username sont vides ou non définis
      throw new Error("Champs manquants"); // Lance une nouvelle erreur avec le message "Champs manquants"
    }

    const updateUser = await prisma.user.update({
      // Met à jour les données de l'utilisateur dans la base de données en utilisant la méthode `update` de Prisma
      where: {
        id: currentUser.id, // Spécifie l'ID de l'utilisateur à mettre à jour (l'ID de l'utilisateur authentifié)
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updateUser); // Retourne une réponse avec le code d'état 200 (OK) et les données de l'utilisateur mis à jour au format JSON
  } catch (error) {
    console.log(error); // Affiche l'erreur dans la console
    res.status(400).end(); // Retourne une réponse avec le code d'état 400 (Mauvaise requête) et termine la fonction
  }
}
