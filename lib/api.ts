// lib/api.ts
export async function getPosts() {
  try {
    const res = await fetch("/api/posts", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
