"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search menu..."
        className="bg-white/5 border border-white/10 rounded-full py-2 px-4 pl-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-peckers-yellow transition-all w-40 md:w-48 lg:w-64"
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-peckers-yellow transition-colors" />
    </form>
  );
}
