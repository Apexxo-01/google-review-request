import links from './clientLinks.json';

export function getReviewUrl(slug: string): string | null {
  return links[slug] || null;
}