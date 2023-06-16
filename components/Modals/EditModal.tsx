import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

// Hook
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

// Components
import { Modal } from "../UI/Modal";
import { Input } from "../UI/Input";
import ImageUpload from "../UI/ImageUpload";

const EditModal = () => {
  // Récupération des données de l'utilisateur actuellement connecté
  const { data: currentUser } = useCurrentUser();
  // Mutation personnalisée pour mettre à jour les données de l'utilisateur
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);

  // Utilisation du hook useEditModal pour gérer le modal d'édition
  const editModal = useEditModal();

  // États pour les champs du formulaire d'édition
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  // Mise à jour des états des champs avec les valeurs de l'utilisateur actuel au montage du composant
  useEffect(() => {
    setProfileImage(currentUser?.profileImage || ""); // Utilise une chaîne vide si la valeur est null ou non définie
    setCoverImage(currentUser?.coverImage || "");
    setName(currentUser?.name || "");
    setUserName(currentUser?.username || "");
    setBio(currentUser?.bio || "");
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
  ]);

  // État pour gérer l'affichage du chargement
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Soumission du formulaire d'édition
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      // Appel à l'API pour mettre à jour les informations de l'utilisateur
      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      // Mise à jour des données de l'utilisateur à travers la mutation personnalisée
      mutateFetchedUser();

      // Affichage d'une notification de succès
      toast.success("Vos informations ont été mises à jour.");

      // Fermeture du modal d'édition
      editModal.onClose();
    } catch (error) {
      // Affichage d'une notification d'erreur en cas d'échec
      toast.error("Quelque chose n'a pas fonctionné");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    username,
    coverImage,
    profileImage,
    name,
    editModal,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        label="Télécharger une image de profil"
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
      />
      <ImageUpload
        label="Télécharger une image de couverture"
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
      />
      <Input
        placeholder="Nom"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Nom d'utilisateur"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  //   console.log("Valeur : " + name);
  //   console.log("Valeur : " + username);
  //   console.log("Valeur : " + bio);

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Modifier votre profil"
      actionLabel="Sauvegarder"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};
export default EditModal;
