import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Users } from 'lucide-react';
import api, { apiBase } from '../api/axios';

function logoUrl(path) { return !path ? '' : path.startsWith('http') ? path : `${apiBase}${path}`; }

export default function ToolDetail() {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { api.get(`/tools/${id}`).then((r) => setTool(r.data)).catch((e) => setError(e.response?.data?.message || 'Tool not found')); }, [id]);

  if (error) return <section className="page-wrap py-10"><Link to="/tools" className="font-black text-amber-500">← Back to tools</Link><div className="card mt-5 p-6 text-red-700">{error}</div></section>;
  if (!tool) return <section className="page-wrap py-10 text-slate-500">Loading tool...</section>;

  return <section className="page-wrap py-10"><Link to="/tools" className="inline-flex items-center gap-2 font-black text-amber-500"><ArrowLeft size={18} /> Back to tools</Link><div className="soft-card mt-6 grid gap-8 p-8 lg:grid-cols-[1fr_320px]"><div><div className="flex items-center gap-5">{tool.logo ? <img src={logoUrl(tool.logo)} alt="" className="h-20 w-20 rounded-2xl object-cover" /> : <div className="gold-icon h-20 w-20 text-3xl font-black">{tool.name?.[0]}</div>}<div><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-600">{tool.status}</span><h1 className="mt-2 text-5xl font-black tracking-[-.05em]">{tool.name}</h1><p className="mt-1 capitalize text-slate-500">{tool.category}</p></div></div><p className="mt-7 text-lg leading-8 text-slate-700">{tool.description}</p><h2 className="mt-8 text-2xl font-black">Purpose</h2><p className="mt-2 leading-7 text-slate-600">{tool.purpose}</p><h2 className="mt-8 text-2xl font-black">Capabilities</h2><div className="mt-3 flex flex-wrap gap-2">{tool.capabilities?.length ? tool.capabilities.map((x) => <span key={x} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold">{x}</span>) : <span className="text-slate-500">No capabilities listed.</span>}</div></div><aside className="space-y-4"><div className="card p-5"><h3 className="font-black">Best For</h3><p className="mt-2 flex items-center gap-2 text-slate-600"><Users size={18} />{tool.mainUsers?.join(', ') || 'All users'}</p></div><div className="card p-5"><h3 className="font-black">Tags</h3><div className="mt-3 flex flex-wrap gap-2">{tool.tags?.length ? tool.tags.map((x) => <span key={x} className="rounded-lg bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">{x}</span>) : <span className="text-slate-500">No tags.</span>}</div></div>{tool.url && <a href={tool.url} target="_blank" rel="noreferrer" className="btn-primary w-full">Visit Tool <ExternalLink size={18} /></a>}</aside></div></section>;
}
