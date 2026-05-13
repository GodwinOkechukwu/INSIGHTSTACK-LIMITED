"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const SETTING_FIELDS = [
  { key: "shop_name", label: "Shop Name", type: "text" },
  { key: "company_name", label: "Company Name", type: "text" },
  { key: "email", label: "Contact Email", type: "email" },
  { key: "contact", label: "Contact Phone", type: "text" },
  { key: "website", label: "Website URL", type: "url" },
  { key: "address", label: "Address", type: "text" },
  { key: "default_currency", label: "Default Currency", type: "text" },
  { key: "timezone", label: "Timezone", type: "text" },
  { key: "date_format", label: "Date Format", type: "text" },
  { key: "vat_number", label: "VAT Number", type: "text" },
  { key: "post_code", label: "Post Code", type: "text" },
  { key: "percentage", label: "Pay Later Percentage (%)", type: "number" },
  { key: "number_of_image_per_product", label: "Max Images Per Product", type: "number" },
  { key: "receipt_size", label: "Receipt Size", type: "text", hint: "e.g. A4, Letter" },
];

export default function SettingsPage() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: () => fetch("/api/admin/settings").then((r) => r.json()),
  });

  useEffect(() => {
    if (data?.settings) {
      setForm(data.settings);
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (body: Record<string, string>) =>
      fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((r) => r.json()),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
  });

  if (isLoading) {
    return <div className="text-gray-400 text-sm py-10 text-center">Loading settings...</div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h3 className="font-semibold text-gray-800">Global Settings</h3>

        {SETTING_FIELDS.map(({ key, label, type, hint }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              value={form[key] ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
              placeholder={hint}
            />
          </div>
        ))}

        {saved && <p className="text-sm text-green-600">Settings saved successfully!</p>}
        {saveMutation.isError && <p className="text-sm text-red-500">Failed to save. Please try again.</p>}

        <button
          onClick={() => saveMutation.mutate(form)}
          disabled={saveMutation.isPending}
          className="w-full py-2.5 bg-[#3DBD7F] hover:bg-[#2ea86f] text-white font-semibold rounded-lg text-sm disabled:opacity-60"
        >
          {saveMutation.isPending ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
