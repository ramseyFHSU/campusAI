import { useState } from "react";
import { Camera, Upload } from "lucide-react";
import api, { apiBase } from "../api/axios";
import { useAuth } from "../context/AuthContext";

function avatarUrl(path) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${apiBase}${path}`;
}

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(avatarUrl(user?.avatar));
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const saveProfile = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    try {
      const { data } = await api.put("/auth/me", form);
      updateUser(data);
      setForm({ name: data.name || "", email: data.email || "", avatar: data.avatar || "" });
      setAvatarPreview(avatarUrl(data.avatar));
      setMsg("Profile updated.");
    } catch (error) {
      setErr(error.response?.data?.message || "Profile update failed.");
    }
  };

  const uploadAvatar = async (e) => {
    e.preventDefault();
    if (!avatarFile) return;

    setMsg("");
    setErr("");

    try {
      const data = new FormData();
      data.append("avatar", avatarFile);
      const res = await api.put("/auth/me/avatar", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      updateUser(res.data);
      setForm({ name: res.data.name || "", email: res.data.email || "", avatar: res.data.avatar || "" });
      setAvatarPreview(avatarUrl(res.data.avatar));
      setAvatarFile(null);
      setMsg("Profile picture updated.");
    } catch (error) {
      setErr(error.response?.data?.message || "Profile picture upload failed.");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    try {
      await api.put("/auth/me/password", passwords);
      setPasswords({ currentPassword: "", newPassword: "" });
      setMsg("Password updated.");
    } catch (error) {
      setErr(error.response?.data?.message || "Password update failed.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="page-title">Profile</h1>

      {msg && <div className="rounded-xl bg-green-50 p-3 text-green-700">{msg}</div>}
      {err && <div className="rounded-xl bg-red-50 p-3 text-red-700">{err}</div>}

      <form onSubmit={uploadAvatar} className="card p-5">
        <h2 className="font-semibold">Profile picture</h2>
        <div className="mt-4 flex flex-wrap items-center gap-5">
          <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-amber-100 text-3xl font-black text-amber-600">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Profile avatar" className="h-full w-full object-cover" />
            ) : (
              user?.name?.[0] || "U"
            )}
          </div>

          <div className="flex-1">
            <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-600 hover:border-amber-400 hover:bg-amber-50">
              <Camera size={18} />
              Choose a profile picture
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
            {avatarFile && <p className="mt-2 text-sm text-slate-500">Selected: {avatarFile.name}</p>}
          </div>

          <button className="btn-primary" disabled={!avatarFile}>
            <Upload size={18} /> Upload
          </button>
        </div>
      </form>

      <form onSubmit={saveProfile} className="card p-5 space-y-4">
        <h2 className="font-semibold">Account details</h2>
        <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" placeholder="Avatar URL" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
        <button className="btn-primary">Save profile</button>
      </form>

      <form onSubmit={changePassword} className="card p-5 space-y-4">
        <h2 className="font-semibold">Change password</h2>
        <input className="input" type="password" placeholder="Current password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} />
        <input className="input" type="password" placeholder="New password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
        <button className="btn-primary">Update password</button>
      </form>
    </div>
  );
}
