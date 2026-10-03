import { Link, useLocation } from "react-router";

const Footer = () => {
    const location = useLocation();

    return (
        <footer className="w-full border-t border-slate-700 bg-slate-900 py-5 text-slate-300 transition-all">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 sm:flex-row text-sm font-medium text-slate-500">
                {/* Brand / Name */}
                <div className="text-slate-100 font-semibold tracking-tight">
                    CastKit Weather
                </div>

                {/* Text Navigation Links */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className={`transition hover:text-blue-500 ${location.pathname === "/" ? "text-blue-600 font-bold" : "text-slate-600"
                            }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/about"
                        className={`transition hover:text-blue-500 ${location.pathname === "/about" ? "text-blue-600 font-bold" : "text-slate-600"
                            }`}
                    >
                        About
                    </Link>
                </div>

                {/* Copyright */}
                <div className="text-xs text-slate-400">
                    © {new Date().getFullYear()} CastKit. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;