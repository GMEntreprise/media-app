// Librairy
import bcrypt from "bcrypt";
import Nextauth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Components
import prisma from "@/libs/prismadb";

export default Nextauth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // CredentialsProvider: Un fournisseur d'authentification qui utilise les informations d'identification (nom d'utilisateur et mot de passe) pour l'authentification.
    CredentialsProvider({
      name: "credentials",

      /*  `credentials` est utilisé pour générer un formulaire sur la page de connexion.
     Vous pouvez spécifier quels champs doivent être soumis, en ajoutant des clés à l'objet `credentials`.
     Par exemple, domaine, nom d'utilisateur, mot de passe, jeton 2FA, etc.
     Vous pouvez passer n'importe quel attribut HTML à la balise <input> à travers l'objet.
    credentials: { */

      credentials: {
        //       Ajouter une logique ici pour rechercher l'utilisateur à partir des informations d'identification fournies.
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      /** La méthode authorize est définie pour effectuer la logique d'autorisation personnalisée. Dans cet exemple, elle vérifie si les informations d'identification sont valides en recherchant l'utilisateur correspondant à l'e-mail fourni, en vérifiant le hachage du mot de passe, et en renvoyant l'utilisateur s'il est valide. */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("invalid credentials");
        }
        // bcrypt: Une bibliothèque de hachage de mots de passe utilisée pour vérifier les mots de passe hachés.
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("invalid credentials");
        }

        return user;
      },
    }),
  ],

  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
