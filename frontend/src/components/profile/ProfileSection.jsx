const ProfileSection = ({
  title,
  children,
}) => {
  return (
    <section className="mt-7">
      <h3 className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
        {title}
      </h3>

      <div className="space-y-2.5">
        {children}
      </div>
    </section>
  );
};

export default ProfileSection;