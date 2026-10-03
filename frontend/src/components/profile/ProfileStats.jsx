const ProfileStats = ({
  friends,
  messages,
  groups,
}) => {
  return (
    <section className="mt-4 rounded-2xl border border-[#eeeeeb] bg-white px-5 py-4">
      <div className="grid grid-cols-3 divide-x divide-[#eeeeeb]">
        
        <div className="text-center">
          <p className="text-lg font-semibold text-[#191919]">
            {friends}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Friends
          </p>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-[#191919]">
            {messages}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Messages
          </p>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-[#191919]">
            {groups}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Groups
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileStats;