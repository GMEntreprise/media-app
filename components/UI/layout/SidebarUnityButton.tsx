import { useRouter } from "next/router";

// Librairy
import { FaFeather } from "react-icons/fa";
import { RiCommunityFill } from "react-icons/ri";
import { GiAncientSword } from "react-icons/gi";

// Components

export const SidebarUnityButton = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/")}>
      <button className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-lime-500 hover:bg-opacity-80 transition cursor-pointer">
        {/* <FaFeather size={24} color="#fff" /> */}
        {/* <RiCommunityFill size={24} color="#fff" /> */}
        <GiAncientSword size={24} color="#fff" />
      </button>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-lime-500 hover:bg-opacity-90 cursor-pointer transition">
        <p className="hidden lg:block font-semibold text-center text-white text-[20px]">
          {" "}
          Heis{" "}
        </p>
      </div>
    </div>
  );
};
