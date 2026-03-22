export default function HeaderActionButton({ href, className = "", children }) {
  return (
    <div className="group relative inline-flex align-middle">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 translate-x-[4px] translate-y-[4px] rounded-full bg-white opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />

      <a
        href={href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative z-10 inline-flex items-center justify-center rounded-full border-[0.15vw] border-white bg-black leading-none ${className}`}
      >
        {children}
      </a>
    </div>
  );
}
