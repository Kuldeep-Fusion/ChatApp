import { useAuth } from "../../context/AuthContext";

const ProfileInfo = () => {
    const { user } = useAuth();
    console.log(user);


  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold tracking-tight text-[#171717]">
       {user.name}
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        {user.username || 'Create UserName'}
      </p>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
       {user.bio || 'Write Your Bio'}
      </p>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-[#52b957]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#52b957]" />
        {user.lastSeen}
      </div>
    </div>
  );
};

export default ProfileInfo;