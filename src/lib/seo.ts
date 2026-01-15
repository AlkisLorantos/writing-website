export const site = {
  name: "Alkis Lorantos",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description: "Essays and thoughts on politics, power, and how stories shape perception.",
  locale: "en_US",
  author: "Alkis Lorantos",
  twitter: "@alkislorantos", 
  keywords: ["politics", "international affairs", "media analysis", "essays"],
};
  
  export function absoluteUrl(path: string) {
    return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
  }