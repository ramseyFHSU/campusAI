import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
export default function StoryCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [err, setErr] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("content", content);
      if (file) fd.append("media", file);
      await api.post("/stories", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/stories");
    } catch (e) {
      setErr(e.response?.data?.message || "Could not post story");
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="page-title mb-4">Share your story</h1>
      {err && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{err}</div>
      )}
      <form onSubmit={submit} className="space-y-4">
        <input
          className="input"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="input"
          rows="6"
          placeholder="Tell us about your experience..."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium mb-1">
            Optional image or video
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button className="btn-primary w-full">Post story</button>
      </form>
    </div>
  );
}
