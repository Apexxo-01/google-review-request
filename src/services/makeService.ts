
export async function getClientLinkBySlug(slug: string) {
  const url = `https://hook.us1.make.com/hlku66tksl5mr6z77lxwd1hvbdew77mt?slug=${slug}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch client data");
  }
  return await res.json();
}
