import Image from "next/image";
import { useRouter } from "next/router";

export const SidebarLogo = () => {
  // Router
  const router = useRouter();

  return (
    <div
      className="rounded-full h-14 w-14  items-center justify-center hover:bg-lime-300 hover:bg-opacity-10  cursor-pointer transition"
      onClick={() => router.push("/")}
    >
      <Image
        src="/logo.png"
        alt="Jesus lave les pied"
        width={320}
        height={320}
      />
    </div>
  );
};
