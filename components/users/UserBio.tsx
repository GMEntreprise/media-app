import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import React, { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";

// Components
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import Button from "../UI/Button";
import useEditModal from "@/hooks/useEditModal";

interface UserBioProps {
  userId: string;
}

export const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  // Utilisation du hook useCurrentUser pour récupérer les données de l'utilisateur actuellement connecté
  const { data: currentUser } = useCurrentUser();
  // Utilisation du hook useUser pour récupérer les données de l'utilisateur cible
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();

  // Utilisation de useMemo pour calculer et mémoriser la valeur de createdAt
  const createdAt = useMemo(() => {
    if (!fetchedUser?.createAt) {
      return null;
    }
    // Formatage de la date en utilisant la locale française (frLocale)
    return format(new Date(fetchedUser.createAt), "MMMM yyyy", {
      locale: frLocale,
    });
  }, [fetchedUser?.createAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Modifier" onClick={editModal.onOpen} />
        ) : (
          <Button onClick={() => {}} label="Suivre" secondary />
        )}
      </div>

      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">{fetchedUser?.username}</p>
        </div>

        <div className="flex flex-col mt-4">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p> Rejoint en {createdAt} </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>

          {/* 2 */}
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
