// Librairy

import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
// Components

import { Input } from "../UI/Input";
import { Modal } from "../UI/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

export const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  //   State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //  onToggle Cette function permet d'ouvrir la page inscription ou Login

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    // Quand on click sur S'inscrire en bas dans le footer il ouvre le Modal RegisterModal
    registerModal.onClose();

    // Ça ouvre le Modal Login
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  /*   onSubmit function useCallback est utilisé pour mémoriser la fonction afin qu'elle ne soit pas recréée à chaque rendu du composant parent. 
    Cela peut aider à optimiser les performances. */

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // TODO ADD Register and Login
      // Envoi d'une requête POST à l'endpoint "/api/register" avec les données spécifiées
      await axios.post("/api/register", {
        email, // Adresse e-mail de l'utilisateur
        password, // Mot de passe de l'utilisateur
        username, // Nom d'utilisateur de l'utilisateur
        name, // Nom complet de l'utilisateur
      });

      // Affichage d'un message de succès à l'aide de la bibliothèque de notifications Toast
      toast.success("Votre compte a bien été créé.");

      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("une erreur s'est produite.");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  // BODYCONTENT
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="example@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Nom"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Prénom"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        disabled={isLoading}
      />
    </div>
  );
  // console.log(bodyContent);

  // Footer Content

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Avez vous déja un compte?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          {" "}
          S`inscrire{" "}
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Créer un compte"
      actionLabel="S'inscrire"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
