export default function HeaderActionButton({ href, className = "", children }) {
  return (
    <div className="group relative inline-flex align-middle">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 translate-x-[4px] translate-y-[4px] rounded-full bg-white opacity-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-[6px] group-hover:translate-y-[6px]"
      />

      <a
        href={href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative z-10 inline-flex items-center justify-center rounded-full border-[0.15vw] border-white bg-black leading-none transition-all duration-200 ease-out group-hover:-translate-x-[1px] group-hover:-translate-y-[1px] ${className}`}
      >
        {children}
      </a>
    </div>
  );
}
