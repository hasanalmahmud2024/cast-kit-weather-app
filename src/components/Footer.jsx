import { Link, useLocation } from "react-router";

const Footer = () => {
    const location = useLocation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-slate-800 bg-slate-900 text-slate-300 transition-all">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:flex-row sm:py-8">

                {/* Brand / Name */}
                <div className="text-base font-semibold tracking-tight text-slate-100">
                    CastKit Weather
                </div>

                {/* Text Navigation Links */}
                <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link
                        to="/"
                        className={`transition hover:text-blue-400 ${location.pathname === "/"
                                ? "font-semibold text-blue-400"
                                : "text-slate-400"
                            }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/about"
                        className={`transition hover:text-blue-400 ${location.pathname === "/about"
                                ? "font-semibold text-blue-400"
                                : "text-slate-400"
                            }`}
                    >
                        About
                    </Link>

                    <a
                        href="https://github.com/hasanalmahmud2024/cast-kit-weather-app"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 transition hover:text-blue-400"
                    >
                        GitHub
                    </a>
                </nav>

                {/* Copyright */}
                <div className="text-xs text-slate-500 sm:order-0">
                    © {currentYear} CastKit. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;