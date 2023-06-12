import React from "react"; // Importation de React depuis la bibliothèque react
import { useRouter } from "next/router"; // Importation du hook useRouter depuis la bibliothèque next/router
import { ClipLoader } from "react-spinners"; // Importation du composant ClipLoader depuis la bibliothèque react-spinners

// Components
import useUser from "../../hooks/useUser"; // Importation du hook useUser depuis le fichier "../../hooks/useUser"
import { Header } from "../../components/UI/Header"; // Importation du composant Header depuis le fichier "../../components/UI/Header"
import { UserHero } from "@/components/users/UserHero"; // Importation du composant UserHero depuis le fichier "@/components/users/UserHero"
import { UserBio } from "@/components/users/UserBio";

const UserView = () => {
  const router = useRouter(); // Initialisation du hook useRouter pour accéder à l'objet router
  const { userId } = router.query; // Récupération de l'userId à partir de l'objet router.query

  const { data: fetchedUser, isLoading } = useUser(userId as string); // Utilisation du hook useUser pour récupérer les données de l'utilisateur correspondant à l'userId fourni
  console.log();

  if (isLoading || !fetchedUser) {
    // Si les données sont en cours de chargement ou si fetchedUser est null ou undefined
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  );
};

export default UserView; // Exportation du composant UserView
