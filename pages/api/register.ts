// Librairy
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Si la méthode de requête (req.method) est "POST", cela signifie que la requête n'est pas autorisée pour cette route. Dans ce cas, le gestionnaire de requêtes renvoie une réponse avec le code d'état 405 (Method Not Allowed).
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { email, username, name, password } = req.body;

    // Hachage du mot de passe fourni en utilisant la fonction bcrypt.hash() avec un coût de 12 (nombre de tours de hachage)
    const hashedPassword = await bcrypt.hash(password, 12);

    /*Création d'un nouvel utilisateur :
    La méthode prisma.user.create() est appelée pour créer un nouvel utilisateur dans la base de données en utilisant les données fournies.
    Les propriétés email, username, name et hashedPassword sont utilisées pour créer l'utilisateur.*/
    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });
    // Si la création de l'utilisateur est réussie, une réponse avec le code d'état 200 est renvoyée, et l'objet utilisateur créé est renvoyé au format JSON.
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    // En cas d'erreur, une réponse avec le code d'état 400 (Bad Request) est renvoyée.
    return res.status(400).end();
  }
}
