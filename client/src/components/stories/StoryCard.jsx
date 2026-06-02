import { Link } from "react-router-dom";
import { Calendar, MessageSquare, UserRound } from "lucide-react";
import { apiBase } from "../../api/axios";

function mediaUrl(path) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${apiBase}${path}`;
}

export default function StoryCard({ story }) {
  return (
    <Link
      to={`/stories/${story._id}`}
      className="card block overflow-hidden transition hover:shadow-md"
    >
      {story.mediaType === "image" && story.mediaUrl ? (
        <img
          src={mediaUrl(story.mediaUrl)}
          alt={story.title}
          className="h-44 w-full object-cover"
        />
      ) : story.mediaType === "video" && story.mediaUrl ? (
        <video
          src={mediaUrl(story.mediaUrl)}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="photo-card h-44" />
      )}

      <div className="p-5">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-600">
          Community Story
        </span>

        <h3 className="mt-3 text-lg font-black leading-tight">{story.title}</h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {story.content}
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <UserRound size={14} />
            {story.createdBy?.name || "Community member"}
          </span>

          {story.createdAt && (
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(story.createdAt).toLocaleDateString()}
            </span>
          )}

          <span className="flex items-center gap-1">
            <MessageSquare size={14} />
            {story.comments?.length || 0} comments
          </span>
        </div>
      </div>
    </Link>
  );
}
