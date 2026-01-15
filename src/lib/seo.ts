export const site = {
    name: "Alkis Lorantos",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    description:
      "Essays and notes on politics, power, and how stories shape perception.",
    locale: "en_US",
  };
  
  export function absoluteUrl(path: string) {
    return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
  }