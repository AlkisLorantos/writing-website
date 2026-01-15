import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/10 mt-20">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          <div className="space-y-3">
            <h3 className="text-xs tracking-widest uppercase text-black/60">
              About
            </h3>
            <p className="text-sm text-black/75 leading-relaxed">
              Writing on politics, society and world affairs
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs tracking-widest uppercase text-black/60">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2 text-sm text-black/75">
              <Link href="/articles" className="hover:text-black transition-colors duration-200">
                Articles
              </Link>
              <Link href="/notes" className="hover:text-black transition-colors duration-200">
                Notes
              </Link>
              <Link href="/tags" className="hover:text-black transition-colors duration-200">
                Tags
              </Link>
              <Link href="/about" className="hover:text-black transition-colors duration-200">
                About
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs tracking-widest uppercase text-black/60">
              Connect
            </h3>
            <div className="flex flex-col gap-2 text-sm text-black/75">
              <a 
                href="/rss.xml" 
                className="hover:text-black transition-colors duration-200"
              >
                RSS Feed
              </a>
              <a 
                href="mailto:alkis.lorantos@icloud.com" 
                className="hover:text-black transition-colors duration-200"
              >
                Email
              </a>
              <a 
                href="https://twitter.com/alkislorantos" 
                className="hover:text-black transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <a 
                href="https://www.linkedin.com/in/alkis-lorantos-0906801b4/" 
                className="hover:text-black transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-black/50">
          <p>© {new Date().getFullYear()} Alkis Lorantos. All rights reserved.</p>
          <p>Built with Next.js and Sanity</p>
        </div>
      </div>
    </footer>
  );
}