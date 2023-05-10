import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface HeaderProps {
  label?: string;
  showBackArrow?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  // Router
  const router = useRouter();
  const [count, setCount] = useState<number>(0);

  //increase counter

  //   Comportement
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return <div></div>;
};
