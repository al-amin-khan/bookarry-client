// src/components/Footer.jsx

import { Link } from "react-router";
import {
    Facebook,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    BookOpen,
} from "lucide-react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-neutral text-neutral-content mt-16">
            {/* Top section */}
            <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
                {/* Brand + short text */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                            <BookOpen size={20} />
                        </span>
                        <span className="text-xl font-semibold tracking-tight">
                            Boo<span className="text-primary">Karry</span>
                        </span>
                    </div>
                    <p className="text-sm text-neutral-content/80 leading-relaxed">
                        Bookarry connects readers with nearby libraries and brings books
                        to their doorstep with fast, reliable delivery.
                    </p>
                </div>

                {/* Quick links */}
                <div>
                    <h3 className="text-sm font-semibold tracking-wide uppercase mb-3">
                        Quick Links
                    </h3>
                    <nav className="flex flex-col gap-2 text-sm">
                        <Link to="/" className="link link-hover">
                            Home
                        </Link>
                        <Link to="/books" className="link link-hover">
                            All Books
                        </Link>
                        <Link to="/dashboard" className="link link-hover">
                            Dashboard
                        </Link>
                        <Link to="/login" className="link link-hover">
                            Login
                        </Link>
                        <Link to="/register" className="link link-hover">
                            Register
                        </Link>
                    </nav>
                </div>

                {/* Contact + social */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold tracking-wide uppercase">
                        Contact
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                            <MapPin size={16} className="mt-0.5" />
                            <span>Dhaka, Bangladesh</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone size={16} />
                            <a href="tel:+8801000000000" className="link link-hover">
                                +880 10 0000 0000
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail size={16} />
                            <a
                                href="mailto:support@bookarry.com"
                                className="link link-hover"
                            >
                                support@bookarry.com
                            </a>
                        </li>
                    </ul>

                    <div className="pt-2">
                        <p className="text-xs font-semibold tracking-wide uppercase mb-2">
                            Follow us
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-ghost btn-sm btn-circle"
                                aria-label="GitHub"
                            >
                                <Github size={16} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-ghost btn-sm btn-circle"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={16} />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-ghost btn-sm btn-circle"
                                aria-label="Facebook"
                            >
                                <Facebook size={16} />
                            </a>

                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-ghost btn-sm btn-circle font-semibold text-xs"
                                aria-label="X (formerly Twitter)"
                            >
                                X
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div className="border-t border-neutral/40">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-content/70">
                    <p>
                        © {year} BooKarry. All rights reserved.
                    </p>
                    <p>
                        Powered by{' '}
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="link link-hover"
                        >
                            BooKarry
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
