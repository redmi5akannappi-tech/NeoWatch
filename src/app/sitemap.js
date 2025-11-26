export default async function sitemap() {
  const baseUrl = "https://neo-watch-chi.vercel.app";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/movie`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tv`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/anime`,
      lastModified: new Date(),
    },
  ];
}
