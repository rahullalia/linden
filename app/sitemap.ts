import type { MetadataRoute } from "next";

const site = "https://linden-one.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", "/first-visit", "/gift-cards", "/book"];
  const now = new Date();

  return routes.map((route) => ({
    url: `${site}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/book" ? 0.9 : 0.7,
  }));
}
