import axios from "axios";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

// Importation des hooks personnalisés et des composants
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import Button from "./Button";
import Avatar from "./Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  // Utilisation des hooks personnalisés
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser(); // Récupération des données de l'utilisateur actuel
  const { mutate: mutatePosts } = usePosts(); // Mutation des posts

  // Définition des états locaux
  const [body, setBody] = useState<string>(""); // État local pour stocker le contenu du formulaire
  const [isLoading, setIsLoading] = useState<boolean>(false); // État local pour indiquer si le formulaire est en cours de chargement

  // Fonction de soumission du formulaire
  const onSubmit = useCallback(async () => {
    try {
      // Envoi de la requête POST pour créer un nouveau post
      await axios.post(`/api/posts`, { body });
      toast.success("Vous avez créé un post");

      setBody(""); // Réinitialisation du contenu du formulaire

      mutatePosts(); // Mutation des posts pour mettre à jour les données
    } catch (error) {
      console.log(error);
      toast.error("Un problème est survenu !");
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  }, [body, mutatePosts]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? ( // Si un utilisateur est connecté
        <div className="flex flex-row gap-4">
          <Avatar userId={currentUser?.id} /> /
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)} // Gestion du changement de la valeur du formulaire
              value={body}
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />

            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit} // Appel de la fonction de soumission du formulaire
                label="Faire entendre ma voix"
              />
            </div>
          </div>
        </div>
      ) : (
        // Si aucun utilisateur n'est connecté
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Bienvenue sur Heist-Unity
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Connexion" onClick={loginModal.onOpen} />
            <Button
              label="S'inscrire"
              onClick={registerModal.onOpen} // Affichage du bouton d'inscription
              secondary
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
