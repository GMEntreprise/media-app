import Image from "next/image";
import React, { useCallback, useState } from "react"; // Importation des modules nécessaires de React
import { useDropzone } from "react-dropzone"; // Importation de la fonction useDropzone de la bibliothèque react-dropzone

// Définition des types de propriétés pour le composant ImageUpload
interface ImageUploadProps {
  onChange: (Base64: string) => void; // Une fonction qui sera appelée lorsque l'image sera modifiée
  label: string; // Un libellé pour le composant d'upload d'image
  value: string; // La valeur actuelle de l'image
  disabled: boolean; // Un indicateur pour désactiver le composant d'upload d'image
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  // Définition du composant ImageUpload avec les types de propriétés spécifiés
  onChange,
  label,
  disabled,
  value,
}) => {
  const [base64, setBase64] = useState(value); // Déclaration d'un état local "base64" avec la valeur initiale de la propriété "value"

  // Définition d'une fonction de rappel "handleChange" qui appelle la fonction "onChange" avec le paramètre "base64"
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  // Définition d'une fonction de rappel "handleDrop" qui est appelée lorsque des fichiers sont déposés dans la zone de drop
  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0]; // Récupération du premier fichier déposé
      const reader = new FileReader(); // Création d'une instance de FileReader

      reader.onload = (event: any) => {
        setBase64(event.target.result); // Mise à jour de l'état "base64" avec la valeur du fichier encodé en base64
        handleChange(event.target.result); // Appel de la fonction "handleChange" avec le paramètre "event.target.result"
      };

      reader.readAsDataURL(file); // Lecture du fichier en tant que données URL (encodage base64)
    },
    [handleChange] // Utilisation de "handleChange" comme dépendance pour recalculer la fonction de rappel uniquement si "handleChange" change
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />

      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height={100} width={100} alt="Image de profil" />
        </div>
      ) : (
        <p className="text-white cursor-pointer"> {label} </p>
      )}
    </div>
  );
};

export default ImageUpload;
