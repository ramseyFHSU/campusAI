import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Trash2, UserRound } from "lucide-react";
import api, { apiBase } from "../api/axios";
import { useAuth } from "../context/AuthContext";

function src(path) {
  return !path ? "" : path.startsWith("http") ? path : `${apiBase}${path}`;
}

export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [story, setStory] = useState(null);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");
  const [savingComment, setSavingComment] = useState(false);

  const submitComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    setSavingComment(true);

    try {
      const res = await api.post(`/stories/${id}/comments`, {
        text: commentText,
      });

      setStory(res.data);
      setCommentText("");
    } finally {
      setSavingComment(false);
    }
  };


  const removeStory = async () => {
    if (!confirm("Delete this story?")) return;
    await api.delete(`/stories/${id}`);
    navigate("/stories");
  };

  const canDelete =
    user &&
    story &&
    (user.role === "admin" || String(story.createdBy?._id || story.createdBy) === String(user.id));

  useEffect(() => {
    api
      .get(`/stories/${id}`)
      .then((r) => setStory(r.data))
      .catch((e) => setError(e.response?.data?.message || "Story not found"));
  }, [id]);
  if (error)
    return (
      <section className="page-wrap py-10">
        <Link to="/stories" className="font-black text-amber-500">
          ← Back to stories
        </Link>
        <div className="card mt-5 p-6 text-red-700">{error}</div>
      </section>
    );
  if (!story)
    return (
      <section className="page-wrap py-10 text-slate-500">
        Loading story...
      </section>
    );
  return (
    <section className="page-wrap py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 font-black text-amber-500"
        >
          <ArrowLeft size={18} /> Back to stories
        </Link>

        {canDelete && (
          <button
            type="button"
            onClick={removeStory}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 font-black text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} /> Delete Story
          </button>
        )}
      </div>
      <article className="soft-card mt-6 overflow-hidden">
        {story.mediaType === "image" && story.mediaUrl ? (
          <img
            src={src(story.mediaUrl)}
            alt=""
            className="max-h-[520px] w-full object-cover"
          />
        ) : story.mediaType === "video" && story.mediaUrl ? (
          <video
            src={src(story.mediaUrl)}
            controls
            className="max-h-[520px] w-full object-cover"
          />
        ) : (
          <div className="photo-card h-72" />
        )}
        <div className="p-8">
          <h1 className="text-5xl font-black tracking-[-.05em]">
            {story.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <UserRound size={16} />
              {story.createdBy?.name || "Community member"}
            </span>
            {story.createdAt && (
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(story.createdAt).toLocaleDateString()}
              </span>
            )}
            {story.relatedTool?.name && (
              <span>Tool: {story.relatedTool.name}</span>
            )}
          </div>
          <p className="mt-8 whitespace-pre-wrap text-lg leading-9 text-slate-700">
            {story.content}
          </p>
        </div>
        <div className="soft-card mt-8 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black">Comments</h2>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-black text-amber-700">
              {story.comments?.length || 0}
            </span>
          </div>

          {user ? (
            <form onSubmit={submitComment} className="mb-6">
              <textarea
                className="input min-h-[110px]"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />

              <button
                type="submit"
                className="btn-primary mt-3"
                disabled={savingComment}
              >
                {savingComment ? "Posting..." : "Post Comment"}
              </button>
            </form>
          ) : (
            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-600">
              Please sign in to comment on this story.
            </div>
          )}

          <div className="space-y-4">
            {story.comments?.length ? (
              story.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="rounded-xl border border-slate-100 bg-white p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-black">
                      {comment.createdBy?.name || "Community Member"}
                    </p>

                    <p className="text-xs text-slate-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="whitespace-pre-wrap text-slate-700">
                    {comment.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-500">
                No comments yet. Be the first to comment.
              </p>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
