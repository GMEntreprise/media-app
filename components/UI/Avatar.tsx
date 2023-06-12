import useUser from "@/hooks/useUser"; // Importation du hook useUser depuis le fichier "@/hooks/useUser"
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface AvatarProps {
  userId: string; // Propriété requise userId de type string
  isLarge?: boolean; // Propriété optionnelle isLarge de type boolean
  hasBorder?: boolean; // Propriété optionnelle hasBorder de type boolean
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId); // Utilisation du hook useUser pour récupérer les données de l'utilisateur correspondant à l'userId fourni
  const router = useRouter(); // Initialisation du hook useRouter pour accéder à l'objet router
  const onClick = useCallback(() => {
    event?.stopPropagation(); // Arrête la propagation de l'événement (si fourni)

    const url = `/users/${userId}`; // Construction de l'URL basée sur l'userId fourni

    router.push(url); // Navigation vers l'URL spécifiée à l'aide de la méthode push du router
  }, [router, userId]); // Spécification des dépendances pour le hook useCallback

  return (
    <div
      className={`
    ${hasBorder ? `border-4 border-black` : ""}
    ${isLarge ? `h-32` : "h-12"}
    ${isLarge ? `w-32` : "w-12"}
    rounded-full
    hover:opacity-90
    transition
    cursor-pointer
    relative
  `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || `/images/placeholder.png`}
      />
    </div>
  );
};

export default Avatar;
