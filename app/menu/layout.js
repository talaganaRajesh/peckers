import SubNavbar from "./components/SubNavbar";

export default function MenuLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <SubNavbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
