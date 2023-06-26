import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth"; // Import du module serverAuth qui gère l'authentification du serveur
import prisma from "@/libs/prismadb"; // Import du module prisma qui permet d'interagir avec la base de données

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end(); // Si la méthode de requête n'est ni POST ni GET, renvoie une réponse HTTP 405 "Method Not Allowed"
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res); // Authentifie l'utilisateur en utilisant le module serverAuth
      const { body } = req.body; // Récupère la propriété 'body' de l'objet 'body' de la requête
      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id, // Associe l'ID de l'utilisateur actuel au post créé
        },
      });
      return res.status(200).json(post); // Renvoie une réponse HTTP 200 avec le post créé au format JSON
    }
    if (req.method == "GET") {
      const { userId } = req.query; // Récupère la propriété 'userId' de l'objet 'query' de la requête

      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createAt: "desc",
          },
        });
      }
      return res.status(200).json(posts); // Renvoie une réponse HTTP 200 avec les posts récupérés au format JSON
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end(); // Renvoie une réponse HTTP 400 en cas d'erreur
  }
}
