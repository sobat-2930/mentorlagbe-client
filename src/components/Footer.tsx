import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";

const XLogo = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="X">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const socials = [
    { icon: <FaFacebookF size={18} />, href: "#", label: "Facebook" },
    { icon: <XLogo />, href: "#", label: "X" },
    { icon: <FaLinkedinIn size={18} />, href: "#", label: "LinkedIn" },
    { icon: <FaInstagram size={18} />, href: "#", label: "Instagram" },
  ];
  return (
    <footer className="bg-primary text-primary-content">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-secondary-content">
              <GraduationCap size={22} />
            </span>
            <span className="font-display text-2xl font-semibold">Mentor<span className="text-secondary">Lagbe</span></span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-content/70">
            Verified tutors, personalized batches, and one simple place to learn better.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:bg-secondary hover:text-secondary-content">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-primary-content/70">
            <li><Link href="/" className="hover:text-secondary">Home</Link></li>
            <li><Link href="/tuitions" className="hover:text-secondary">Browse Tuitions</Link></li>
            <li><Link href="/pricing" className="hover:text-secondary">Pricing</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-secondary">How It Works</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg">Get Started</h4>
          <ul className="space-y-2.5 text-sm text-primary-content/70">
            <li><Link href="/sign-up" className="hover:text-secondary">Join as Student</Link></li>
            <li><Link href="/sign-up" className="hover:text-secondary">Become a Tutor</Link></li>
            <li><Link href="/sign-in" className="hover:text-secondary">Sign In</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-content/70">
            <li className="flex items-center gap-3"><Mail size={16} className="text-secondary" /> hello@mentorlagbe.com</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-secondary" /> +880 1700-000000</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-secondary" /> Chattogram, Bangladesh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-primary-content/60">
        © {new Date().getFullYear()} MentorLagbe. All rights reserved.
      </div>
    </footer>
  );
}