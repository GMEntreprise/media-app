// Librairy

import { useCallback, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import { Input } from "../UI/Input";
import { Modal } from "../UI/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

// Components

export const LoginModal = () => {
  // Account login
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  //   State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /*   onSubmit function useCallback est utilisé pour mémoriser la fonction afin qu'elle ne soit pas recréée à chaque rendu du composant parent. 
    Cela peut aider à optimiser les performances. */

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    // Quand on click sur Créer un compte en bas dans le footer il ouvre le Modal RegisterModal
    loginModal.onClose();

    // Ça ouvre le RegisterModal
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // TODO ADD LOG IN
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="example@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  // Footer content
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Première utilisation de heistUnity?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          {" "}
          Créer un compte{" "}
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Connexion"
      actionLabel="Se connecter"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
