import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";

const socials = [
  { icon: <FaFacebookF size={16} />, href: "#", label: "Facebook" },
  { icon: <FaXTwitter size={16} />, href: "#", label: "X" },
  { icon: <FaLinkedinIn size={16} />, href: "#", label: "LinkedIn" },
  { icon: <FaInstagram size={16} />, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <GraduationCap size={22} />
            </span>
            <span className="font-display text-2xl font-semibold">
              Mentor<span className="text-secondary">Lagbe</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            Verified tutors, personalized batches, and one simple place to learn better.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:bg-secondary hover:text-secondary-foreground"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/70">
            <li><Link href="/" className="hover:text-secondary">Home</Link></li>
            <li><Link href="/tuitions" className="hover:text-secondary">Browse Tuitions</Link></li>
            <li><Link href="/pricing" className="hover:text-secondary">Pricing</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-secondary">How It Works</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg">Get Started</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/70">
            <li><Link href="/sign-up" className="hover:text-secondary">Join as Student</Link></li>
            <li><Link href="/sign-up" className="hover:text-secondary">Become a Tutor</Link></li>
            <li><Link href="/sign-in" className="hover:text-secondary">Sign In</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-3"><Mail size={16} className="text-secondary" /> hello@mentorlagbe.com</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-secondary" /> +880 1700-000000</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-secondary" /> Chattogram, Bangladesh</li>
          </ul>
        </div>
      </div>

      {/* <div className="border-t border-white/10 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} MentorLagbe. All rights reserved.
      </div> */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-primary-foreground/60">
  © 2026 MentorLagbe. All rights reserved.
</div>
    </footer>
  );
}