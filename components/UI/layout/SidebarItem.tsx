import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";

// Importation du hook personnalisé useCurrentUser
import useCurrentUser from "@/hooks/useCurrentUser";
import { LoginModal } from "@/components/Modals/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";

// Définition de l'interface pour les props de SidebarItem
interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

// Déclaration du composant SidebarItem en tant que fonction composant React
export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
}) => {
  // Utilisation du hook useLoginModal pour gérer le modal de connexion
  const LoginModal = useLoginModal();
  // Utilisation du hook useCurrentUser pour récupérer les informations de l'utilisateur actuel
  const { data: currentUser } = useCurrentUser();

  // Utilisation du hook useRouter pour accéder à l'objet router
  const router = useRouter();

  // Définition de la fonction handleClick
  const handleClick = useCallback(() => {
    // Si une fonction onClick est fournie, l'exécuter
    if (onClick) {
      return onClick();
    }

    // Vérification si le paramètre auth est défini à true et si currentUser est null
    if (auth && !currentUser) {
      // Si les conditions sont remplies, ouvrir le modal de connexion en utilisant le hook useLoginModal
      LoginModal.onOpen();
    } else if (href) {
      // Si le paramètre href est spécifié, effectuer une navigation vers cette URL en utilisant la méthode router.push
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, LoginModal]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      {/* Composant pour l'affichage du bouton sur mobile */}
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="#fff" />
      </div>
      {/* Composant pour l'affichage du bouton sur les autres résolutions */}
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full  hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer ">
        <Icon size={24} color="#fff" />
        <p className="hidden lg:block text-white text-xl"> {label} </p>
      </div>
    </div>
  );
};
