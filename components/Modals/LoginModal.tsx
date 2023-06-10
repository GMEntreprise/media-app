// Librairies
import { useCallback, useState } from "react";
import { Input } from "../UI/Input";
import { Modal } from "../UI/Modal";
import { signIn } from "next-auth/react";

// Components
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

export const LoginModal = () => {
  // Account login
  const loginModal = useLoginModal(); // Utilise le hook useLoginModal pour gérer la fenêtre modale de connexion
  const registerModal = useRegisterModal(); // Utilise le hook useRegisterModal pour gérer la fenêtre modale d'inscription

  //   State
  const [email, setEmail] = useState(""); // État pour stocker la valeur de l'email du formulaire
  const [password, setPassword] = useState(""); // État pour stocker la valeur du mot de passe du formulaire
  const [isLoading, setIsLoading] = useState(false); // État pour indiquer si une action est en cours de chargement

  /* 
    Fonction onToggle : gère le basculement entre les fenêtres modales de connexion et d'inscription.
    useCallback est utilisé pour mémoriser la fonction afin qu'elle ne soit pas recréée à chaque rendu du composant parent.
    Cela peut aider à optimiser les performances.
  */
  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    // Ferme la fenêtre modale de connexion
    loginModal.onClose();

    // Ouvre la fenêtre modale d'inscription
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  /*
    Fonction onSubmit : gère la soumission du formulaire de connexion.
    Utilise également useCallback pour mémoriser la fonction.
  */
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true); // Définit isLoading à true pour indiquer que l'action est en cours de chargement

      // TODO: AJOUTER LA CONNEXION (LOG IN)
      await signIn("credentials", {
        email,
        password,
      });

      loginModal.onClose(); // Ferme la fenêtre modale de connexion une fois la connexion réussie
    } catch (error) {
      console.log(error); // Affiche une éventuelle erreur dans la console
    } finally {
      setIsLoading(false); // Définit isLoading à false une fois que l'action est terminée (succès ou échec)
    }
  }, [loginModal, email, password]);

  // Contenu du corps de la fenêtre modale
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="example@gmail.com"
        onChange={(e) => setEmail(e.target.value)} // Met à jour la valeur de l'email lorsque l'utilisateur saisit dans le champ
        value={email} // Affiche la valeur actuelle de l'email dans le champ
        disabled={isLoading} // Désactive le champ lorsque isLoading est à true
      />
      <Input
        placeholder="Mot de passe"
        type="password"
        onChange={(e) => setPassword(e.target.value)} // Met à jour la valeur du mot de passe lorsque l'utilisateur saisit dans le champ
        value={password} // Affiche la valeur actuelle du mot de passe dans le champ
        disabled={isLoading} // Désactive le champ lorsque isLoading est à true
      />
    </div>
  );

  // Contenu du pied de la fenêtre modale
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Première utilisation de heistUnity?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle} // Appelle la fonction onToggle lorsqu'on clique sur "Créer un compte"
        >
          {" "}
          Créer un compte{" "}
        </span>
      </p>
    </div>
  );

  // Rendu du composant Modal avec les différentes propriétés et le contenu du corps et du pied définis ci-dessus
  return (
    <Modal
      disabled={isLoading} // Désactive la fenêtre modale lorsque isLoading est à true
      isOpen={loginModal.isOpen} // Indique si la fenêtre modale de connexion est ouverte ou fermée
      title="Connexion" // Titre de la fenêtre modale
      actionLabel="Se connecter" // Étiquette du bouton d'action
      onClose={loginModal.onClose} // Fonction appelée lors de la fermeture de la fenêtre modale
      onSubmit={onSubmit} // Fonction appelée lors de la soumission du formulaire
      body={bodyContent} // Contenu du corps de la fenêtre modale
      footer={footerContent} // Contenu du pied de la fenêtre modale
    />
  );
};
