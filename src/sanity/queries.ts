export const HOME_QUERY = `
{
  "pinned": *[
    _type == "note" &&
    public == true &&
    pinned == true &&
    !(_id in path("drafts.**"))
  ] | order(publishedAt desc)[0]{
    _id, publishedAt, text
  },

  "notes": *[
    _type == "note" &&
    public == true &&
    pinned != true &&
    !(_id in path("drafts.**"))
  ] | order(publishedAt desc)[0...12]{
    _id, publishedAt, text
  },

  "articles": *[
    _type == "article" &&
    !(_id in path("drafts.**"))
  ] | order(publishedAt desc)[0...3]{
    title, "slug": slug.current, publishedAt, summary, tags
  }
}
`;

export const ARTICLES_INDEX = `
*[
  _type=="article" &&
  defined(slug.current) &&
  !(_id in path("drafts.**"))
] | order(publishedAt desc){
  title, "slug": slug.current, publishedAt, summary, tags
}
`;

export const ARTICLE_BY_SLUG = `
*[
  _type == "article" &&
  defined(slug.current) &&
  slug.current == $slug &&
  !(_id in path("drafts.**"))
][0]{
  title,
  "slug": slug.current,
  publishedAt,
  summary,
  tags,
  body
}
`;

export const NOTES_FEED = `
*[_type=="note" && public==true] | order(publishedAt desc){
  _id, publishedAt, text
}
`;