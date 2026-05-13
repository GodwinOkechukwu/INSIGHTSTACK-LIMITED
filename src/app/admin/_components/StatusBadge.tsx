const statusStyles: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed:  "bg-green-100 text-green-800",
  cancelled:  "bg-red-100 text-red-800",
  "on-hold":  "bg-gray-100 text-gray-700",
  refunded:   "bg-purple-100 text-purple-800",
  publish:    "bg-green-100 text-green-800",
  draft:      "bg-gray-100 text-gray-700",
  trash:      "bg-red-100 text-red-800",
  accept:     "bg-green-100 text-green-800",
  decline:    "bg-red-100 text-red-800",
  instock:    "bg-green-100 text-green-800",
  outofstock: "bg-red-100 text-red-800",
  onbackorder:"bg-yellow-100 text-yellow-800",
};

export default function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status?.toLowerCase()] ?? "bg-gray-100 text-gray-700";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${style}`}>
      {status?.replace(/-/g, " ")}
    </span>
  );
}
