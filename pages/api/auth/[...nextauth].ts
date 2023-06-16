import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma), // Utilise PrismaAdapter pour connecter NextAuth à la base de données Prisma
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" }, // Définit les champs d'identification (email et mot de passe) pour le fournisseur "credentials"
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials"); // Si les identifiants ne sont pas fournis, lance une erreur de "Invalid credentials"
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email, // Recherche l'utilisateur dans la base de données en utilisant l'email fourni
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials"); // Si l'utilisateur n'est pas trouvé ou si son mot de passe haché est vide, lance une erreur de "Invalid credentials"
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password, // Compare le mot de passe fourni avec le mot de passe haché de l'utilisateur dans la base de données
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials"); // Si les mots de passe ne correspondent pas, lance une erreur de "Invalid credentials"
        }

        return user; // Retourne l'utilisateur si l'authentification réussit
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development", // Active le mode de débogage uniquement en environnement de développement
  session: {
    strategy: "jwt", // Utilise la stratégie d'authentification JWT (JSON Web Token)
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET, // Clé secrète utilisée pour signer les JWT (JSON Web Tokens)
  },
  secret: process.env.NEXTAUTH_SECRET, // Clé secrète utilisée pour sécuriser les cookies de session
};

export default NextAuth(authOptions); // Exporte l'instance NextAuth avec les options d'authentification configurées
