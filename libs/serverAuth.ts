// Librairies et modules nécessaires
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/libs/prismadb";

// Fonction de gestion de l'authentification côté serveur
const serverAuth = async (req: NextApiRequest) => {
  // Récupération de la session utilisateur à partir de la requête
  const session = await getSession({ req });
  console.log(session);

  // Vérification si l'utilisateur est connecté
  if (!session?.user?.email) {
    throw new Error("Vous n'êtes pas connecté");
  }

  // Recherche de l'utilisateur dans la base de données en utilisant l'adresse e-mail de la session
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // Vérification si l'utilisateur existe dans la base de données
  if (!currentUser) {
    throw new Error("Vous n'êtes pas connecté");
  }

  // Retourne l'utilisateur courant
  return { currentUser };
};

export default serverAuth;
