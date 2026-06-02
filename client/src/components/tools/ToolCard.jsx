import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { apiBase } from "../../api/axios";

function imageUrl(path) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${apiBase}${path}`;
}

export default function ToolCard({ tool }) {
  return (
    <article className="card flex h-full min-w-0 flex-col gap-4 p-5 transition hover:shadow-md">
      <div className="flex min-w-0 items-center gap-3">
        {tool.logo ? (
          <img
            src={imageUrl(tool.logo)}
            alt={`${tool.name} logo`}
            className="h-12 w-12 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <div className="gold-icon h-12 w-12 shrink-0 text-xl font-black">
            {tool.name?.[0] || "A"}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="truncate text-lg font-black">{tool.name}</h3>
          <p className="text-xs font-bold capitalize text-amber-600">
            {tool.category || "General"}
          </p>
        </div>
      </div>

      <p className="line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
        {tool.description}
      </p>

      <div className="grid gap-1 text-xs text-slate-600">
        <p>
          <b>Best for</b>{" "}
          {tool.capabilities?.slice(0, 2).join(", ") || "AI support"}
        </p>
        <p>
          <b>Users</b> {tool.mainUsers?.join(", ") || "All users"}
        </p>
      </div>

      <div className="mt-auto">
        <Link
          to={`/tools/${tool._id}`}
          className="btn-soft w-full !py-3 text-sm"
        >
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
