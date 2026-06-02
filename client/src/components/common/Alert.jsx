export default function Alert({ type = "info", children }) {
  const cls =
    type === "error"
      ? "bg-red-50 text-red-700"
      : type === "success"
        ? "bg-green-50 text-green-700"
        : "bg-blue-50 text-blue-700";
  return <div className={`rounded-lg p-3 ${cls}`}>{children}</div>;
}
