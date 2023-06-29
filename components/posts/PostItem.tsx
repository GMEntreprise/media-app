import { useRouter } from "next/router"; // Importation du module useRouter de Next.js qui permet la gestion des routes
import { useCallback, useMemo } from "react"; // Importation des hooks useCallback et useMemo de React

// Importation des hooks personnalisés
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "../UI/Avatar";

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

export const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
  const router = useRouter(); // Initialisation du hook useRouter pour gérer les routes
  const loginModal = useLoginModal(); // Initialisation du hook useLoginModal pour gérer la fenêtre de connexion
  const { data: currentUser } = useCurrentUser(); // Appel du hook useCurrentUser pour obtenir les informations de l'utilisateur actuel

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`); // Redirige l'utilisateur vers la page du profil de l'utilisateur spécifié
      console.log(data.user.id); // Affiche l'identifiant de l'utilisateur dans la console
    },
    [router, data.user.id] // Dépendances du callback, il se réexécute si l'un de ces éléments change
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`); // Redirige l'utilisateur vers la page du post spécifié
  }, [router, data.id]); // Dépendances du callback

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      loginModal.onOpen(); // Ouvre la fenêtre de connexion lorsqu'un utilisateur clique sur "J'aime"
    },
    [loginModal] // Dépendances du callback
  );

  const createdAt = useMemo(() => {
    if (!data?.createAt) {
      // Vérifie si la propriété "createdAt" existe dans l'objet "data"
      return null; // Si elle n'existe pas, retourne null
    }

    return formatDistanceToNowStrict(new Date(data.createAt)); // Calcule la durée écoulée depuis la date de création du post
  }, [data?.createAt]); // Dépendances du useMemo, il se réexécute si l'une de ces valeurs change

  /*
   Le useMemo est utilisé pour mémoriser le résultat d'une fonction et éviter les calculs inutiles. Dans ce cas, le useMemo est utilisé pour calculer et mémoriser la valeur de "createdAT", qui représente la durée écoulée depuis la date de création du post.

   La fonction passée en argument au useMemo est exécutée lors de la création du composant ou lorsque l'une des dépendances change. Les dépendances sont spécifiées en tant que tableau en deuxième argument du useMemo.

   Si la propriété "createdAt" dans l'objet "data" est null ou undefined, le bloc de code dans le if est exécuté et la valeur retournée est null.

  
*/

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {" "}
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              {" "}
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm"> {createdAt} </span>
          </div>

          <div className="text-white">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-lime-500">
              <AiOutlineMessage size={20} />
              <p> {data.comment?.length || 0} </p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <AiOutlineHeart size={20} />
              <p> {data.comment?.length || 0} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
