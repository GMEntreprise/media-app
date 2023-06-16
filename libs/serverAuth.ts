import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions); // Récupère la session d'utilisateur à partir de la requête HTTP en utilisant les options d'authentification définies dans authOptions

  if (!session?.user?.email) {
    throw new Error("Vous n'êtes pas connecté"); // Si la session ou l'email de l'utilisateur n'est pas disponible, lance une erreur "Vous n'êtes pas connecté"
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email, // Recherche l'utilisateur dans la base de données en utilisant l'email de la session
    },
  });

  if (!currentUser) {
    throw new Error("Vous n'êtes pas connecté"); // Si l'utilisateur n'est pas trouvé dans la base de données, lance une erreur "Vous n'êtes pas connecté"
  }

  return { currentUser }; // Retourne l'utilisateur actuellement connecté
};

export default serverAuth;
