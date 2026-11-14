/** The page width every section shares. */
export default function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto ${narrow ? "max-w-4xl" : "max-w-6xl"} px-4 sm:px-6 ${className}`}
    >
      {children}
    </div>
  );
}
