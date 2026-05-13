"use client";

import { useRef, useState } from "react";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  label?: string;
}

export default function ImageUploader({ value, onChange, maxImages = 5, label = "Images" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = maxImages - value.length;
    if (remaining <= 0) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setError("");
    setUploading(true);

    try {
      const uploaded: string[] = [];
      for (const file of files.slice(0, remaining)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/media/upload", { method: "POST", body: form });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || "Upload failed");
        uploaded.push(data.url);
      }
      onChange([...value, ...uploaded]);
    } catch (err: any) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeImage(url: string) {
    onChange(value.filter((u) => u !== url));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <div className="flex flex-wrap gap-3 mb-3">
        {value.map((url) => (
          <div key={url} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(url)}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xl transition-opacity"
            >
              ×
            </button>
          </div>
        ))}

        {value.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-[#004B93] hover:text-[#004B93] transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <span className="text-xs">Uploading...</span>
            ) : (
              <>
                <span className="text-2xl">+</span>
                <span className="text-xs mt-1">Add Image</span>
              </>
            )}
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <p className="text-xs text-gray-400">
        {value.length}/{maxImages} images. Accepted: JPG, PNG, WebP.
      </p>
    </div>
  );
}
