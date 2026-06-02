import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Globe2,
  Linkedin,
  Youtube,
  Instagram,
} from "lucide-react";
import { BrandLogo } from "../brand/Brand";

const groups = [
  {
    title: "Quick Links",
    links: [
      ["Home", "/"],
      ["About", "/about"],
      ["AI Tools", "/tools"],
      ["Stories", "/stories"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["For Educators", "/about"],
      ["For Students", "/about"],
      ["Tool Guidelines", "/contribute"],
      ["Privacy Policy", "/about"],
      ["Terms of Service", "/about"],
    ],
  },
  {
    title: "Get Involved",
    links: [
      ["Join the Community", "/signup"],
      ["Submit a Tool", "/contribute"],
      ["Share Your Story", "/stories/new"],
      ["Become a Partner", "/contact"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="page-wrap grid gap-10 py-9 md:grid-cols-[1.6fr_1fr_1fr_1fr_1.3fr]">
        <div>
          <Link to="/">
            <BrandLogo className="scale-90 origin-left" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
            Empowering education with AI tools, stories, and a community that
            inspires innovation on every campus.
          </p>
          <div className="mt-5 flex gap-3" aria-label="Social links">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-black text-white"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-black text-white"
              aria-label="X"
            >
              <span className="font-black">X</span>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-black text-white"
              aria-label="Instagram"
            >
              <Instagram size={17} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-black text-white"
              aria-label="YouTube"
            >
              <Youtube size={17} />
            </a>
          </div>
        </div>

        {groups.map((group) => (
          <div key={group.title}>
            <h4 className="font-black">{group.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {group.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="hover:text-amber-600">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-black">Contact Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>
              <a
                className="flex gap-3 hover:text-amber-600"
                href="mailto:ai@fhsu.edu"
              >
                <Mail size={18} />
                ai@fhsu.edu
              </a>
            </li>
            <li>
              <a
                className="flex gap-3 hover:text-amber-600"
                href="https://fhsu.edu"
                target="_blank"
                rel="noreferrer"
              >
                <Globe2 size={18} />
                https://fhsu.edu
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin size={18} />
              Fort Hays State University,
              <br />
              600 Park St, Hays, KS 67601
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-black py-3 text-center text-sm text-white">
        © 2026 FHSU CampusAI. All rights reserved.
      </div>
    </footer>
  );
}
