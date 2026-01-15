import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[720px] px-6 py-20 min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="font-serif text-6xl sm:text-7xl text-black/10">404</h1>
          <h2 className="font-serif text-2xl sm:text-3xl">Page not found</h2>
        </div>
        
        <p className="text-black/75 leading-relaxed max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-2 border border-black/10 rounded-full text-sm hover:bg-black/5 transition-colors duration-200"
          >
            Go home
          </Link>
          <Link
            href="/articles"
            className="inline-block px-6 py-2 border border-black/10 rounded-full text-sm hover:bg-black/5 transition-colors duration-200"
          >
            View essays
          </Link>
        </div>
      </div>
    </main>
  );
}