// Library
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser, FaBible } from "react-icons/fa";
import { BiLogOut, BiMessage } from "react-icons/bi";
import { signOut } from "next-auth/react";

// Composant
import { SidebarLogo } from "./SidebarLogo";
import { SidebarItem } from "./SidebarItem";
import { SidebarUnityButton } from "./SidebarUnityButton";
import useCurrentUser from "@/hooks/useCurrentUser";

export const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  // Navigation Tab
  const items = [
    {
      label: "Acceuil",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
    },
    { label: "Bible", href: "/bible", icon: FaBible },
    { label: "Messages", href: "/messages", icon: BiMessage },

    {
      label: "Profile",
      href: "/users/123",
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className=" col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end ">
        <div className="space-y-2 lg:w-[230px] ">
          <SidebarLogo />
          {items.map((item) => {
            return (
              <SidebarItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                auth={item.auth}
              />
            );
          })}
          {currentUser && (
            <SidebarItem
              onClick={() => {
                signOut();
              }}
              icon={BiLogOut}
              label="Déconnexion"
            />
          )}
          <SidebarUnityButton />
        </div>
      </div>
    </div>
  );
};
