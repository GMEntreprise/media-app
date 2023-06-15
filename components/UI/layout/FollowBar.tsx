import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";

// Components
export const FollowBar = () => {
  // Utilisation du hook useUsers pour récupérer les données des utilisateurs
  const { data: users = [] } = useUsers();

  // Si la liste des utilisateurs est vide, retourne null
  if (users.length === 0) {
    return null;
  }
  return (
    <div className="px-6 py-4 hidden lg:block">
      {/* Start Search Bar */}

      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-sm font-semibold">
          Mes frères et soeurs en Christ
        </h2>
        <div className="flex flex-col gap-6 mt-4">
          {/* TODO USER LIST */}

          {users.map((user: Record<string, any>) => {
            return (
              <div key={user.id} className="flex flex-row gap-4">
                <Avatar userId={user.id} />
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">
                    {user.name}{" "}
                  </p>
                  <p className="text-neutral-400 text-sm"> @{user.username} </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
