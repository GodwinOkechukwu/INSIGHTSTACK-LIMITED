"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ConfirmModal from "../../_components/ConfirmModal";
import ImageUploader from "../../_components/ImageUploader";

interface Banner {
  id: number;
  name: string;
  image_url: string;
  url: string;
  show: boolean;
}

const EMPTY = { name: "", url: "", show: true };

export default function BannersPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [formError, setFormError] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-banners"],
    queryFn: () => fetch("/api/admin/banners").then((r) => r.json()),
  });

  const saveMutation = useMutation({
    mutationFn: (body: any) => {
      if (editId) {
        return fetch(`/api/admin/banners/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then((r) => r.json());
      }
      return fetch("/api/admin/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((r) => r.json());
    },
    onSuccess: (d: any) => {
      if (d.message && !d.id) { setFormError(d.message); return; }
      qc.invalidateQueries({ queryKey: ["admin-banners"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/admin/banners/${id}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-banners"] }); setDeleteId(null); },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, show }: { id: number; show: boolean }) =>
      fetch(`/api/admin/banners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ show }),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-banners"] }),
  });

  function resetForm() {
    setForm(EMPTY);
    setImages([]);
    setEditId(null);
    setFormError("");
  }

  function startEdit(b: Banner) {
    setEditId(b.id);
    setForm({ name: b.name, url: b.url || "", show: b.show });
    setImages(b.image_url ? [b.image_url] : []);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!images[0] && !editId) { setFormError("Image is required"); return; }
    saveMutation.mutate({ ...form, image_url: images[0] || undefined });
  }

  const banners: Banner[] = data?.banners ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">{editId ? "Edit Banner" : "Add Banner"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
              <input
                value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.show}
                onChange={(e) => setForm((f) => ({ ...f, show: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Show on homepage</span>
            </label>
            <ImageUploader value={images} onChange={setImages} maxImages={1} label="Banner Image" />
            {formError && <p className="text-xs text-red-500">{formError}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="flex-1 py-2 bg-[#3DBD7F] hover:bg-[#2ea86f] text-white font-semibold rounded-lg text-sm disabled:opacity-60"
              >
                {saveMutation.isPending ? "Saving..." : editId ? "Update" : "Add Banner"}
              </button>
              {editId && (
                <button type="button" onClick={resetForm} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Banner cards */}
      <div className="lg:col-span-2">
        {isLoading && <div className="text-gray-400 text-sm text-center py-10">Loading...</div>}
        {!isLoading && banners.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
            No banners yet. Add your first banner.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {banners.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="relative aspect-[16/6]">
                <img src={b.image_url} alt={b.name} className="w-full h-full object-cover" />
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${b.show ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {b.show ? "Visible" : "Hidden"}
                </div>
              </div>
              <div className="p-3">
                <p className="font-medium text-gray-800 text-sm">{b.name}</p>
                {b.url && <p className="text-xs text-gray-400 truncate mt-0.5">{b.url}</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => toggleMutation.mutate({ id: b.id, show: !b.show })} className="flex-1 py-1.5 text-xs border border-gray-200 rounded hover:bg-gray-50">
                    {b.show ? "Hide" : "Show"}
                  </button>
                  <button onClick={() => startEdit(b)} className="flex-1 py-1.5 text-xs bg-[#004B93] text-white rounded hover:bg-[#003a73]">Edit</button>
                  <button onClick={() => setDeleteId(b.id)} className="flex-1 py-1.5 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 border border-red-100">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Banner"
        message="Are you sure you want to delete this banner?"
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
