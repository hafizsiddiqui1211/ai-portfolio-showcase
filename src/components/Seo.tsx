import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://chainlit-shine-site.lovable.app";
const DEFAULT_IMAGE = `${SITE_URL}/social-card.png`;

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  publishedTime?: string;
};

/** Per-route <head> management: title, description, canonical, Open Graph, Twitter, JSON-LD. */
const Seo = ({ title, description, path = "/", image = DEFAULT_IMAGE, type = "website", noindex, jsonLd, publishedTime }: SeoProps) => {
  const url = `${SITE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
  const fullTitle = title.includes("Hafiz") ? title : `${title} | Hafiz Wildan Siddiqui`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Hafiz Wildan Siddiqui" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Hafiz Wildan Siddiqui — AI agents, automation and thoughtful interfaces" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>}
    </Helmet>
  );
};

export default Seo;
