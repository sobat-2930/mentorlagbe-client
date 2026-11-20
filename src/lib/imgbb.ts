// key na thakle null return kore, tokhon UI local preview dekhay (demo)
export async function uploadToImgBB(file: File): Promise<string | null> {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) return null;

  const body = new FormData();
  body.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
  const json = await res.json();
  if (!res.ok || !json?.success) throw new Error(json?.error?.message || "Upload failed");
  return json.data.display_url as string;
}