"use client";
import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { uploadToImgBB } from "@/lib/imgbb";
import { cn } from "@/lib/utils";

type Props = {
  value?: string;
  onChange: (url: string) => void;
  variant?: "banner" | "avatar";
  label?: string;
};

export default function ImageUploader({ value, onChange, variant = "banner", label = "Upload image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Please select an image file");
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be smaller than 5MB");

    const previous = value ?? "";
    onChange(URL.createObjectURL(file)); // instant preview
    setUploading(true);
    try {
      const url = await uploadToImgBB(file);
      if (url) {
        onChange(url);
        toast.success("Image uploaded");
      } else {
        toast.info("ImgBB key not set, showing local preview only (demo)");
      }
    } catch {
      onChange(previous);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const picker = (
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => handleFile(e.target.files?.[0])}
    />
  );

  if (variant === "avatar") {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-secondary bg-muted">
          {value ? (
            <img src={value} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <ImagePlus className="absolute inset-0 m-auto text-foreground/30" size={32} />
          )}
          {uploading && (
            <div className="absolute inset-0 grid place-items-center bg-black/40">
              <LoaderCircle className="animate-spin text-white" />
            </div>
          )}
        </div>
        {picker}
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold hover:bg-muted disabled:opacity-50"
        >
          {label}
        </button>
      </div>
    );
  }

  return (
    <div>
      {picker}
      <div
        className={cn(
          "relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-white",
          !value && "cursor-pointer hover:border-primary/50"
        )}
        onClick={() => !value && !uploading && inputRef.current?.click()}
      >
        {value ? (
          <img src={value} alt="Banner preview" className="h-full w-full object-cover" />
        ) : (
          <div className="text-center text-sm text-foreground/60">
            <ImagePlus className="mx-auto mb-2 text-foreground/40" size={32} />
            <p className="font-semibold text-primary">{label}</p>
            <p className="text-xs">PNG, JPG or WEBP · max 5MB</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 grid place-items-center bg-black/40">
            <LoaderCircle className="animate-spin text-white" size={32} />
          </div>
        )}
      </div>
      {value && !uploading && (
        <div className="mt-3 flex gap-3">
          <button type="button" onClick={() => inputRef.current?.click()} className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold hover:bg-muted">
            Replace
          </button>
          <button type="button" onClick={() => onChange("")} className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10">
            <Trash2 size={14} /> Remove
          </button>
        </div>
      )}
    </div>
  );
}