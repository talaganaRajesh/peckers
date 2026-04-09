import Link from "next/link";

export const metadata = {
  title: "Rewards | Peckers",
  description: "Join Peckers Rewards for exclusive offers, member perks, and early access to new menu items.",
};

export default function RewardsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-[#f2df0d] mb-6">Rewards</p>
        <h1 className="text-4xl sm:text-5xl font-peakers uppercase leading-tight mb-6">Join the Peckers Inner Circle</h1>
        <p className="mx-auto max-w-3xl text-base sm:text-lg text-white/80 mb-10">
          Get exclusive deals, early access to new menu drops and loyalty perks when you sign up for Peckers Rewards.
          We&apos;re cooking something special for our members.
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
          <Link
            href="https://peckers.vmos.io/account/auth/register"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#f2df0d] bg-[#f2df0d] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
          >
            Join Now
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
