import { useState } from "react";
import { Search, MapPin, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import LocationModal from "../components/LocationModal";
import Logo from "../components/Logo";

// Popular Bangladeshi city shortcuts for quick forecast access
const POPULAR_CITIES = [
    { name: "Dhaka", lat: 23.8103, long: 90.4125 },
    { name: "Chattogram", lat: 22.3569, long: 91.7832 },
    { name: "Sylhet", lat: 24.8949, long: 91.8687 },
    { name: "Rajshahi", lat: 24.3745, long: 88.6042 },
    { name: "Khulna", lat: 22.8456, long: 89.5403 },
    { name: "Cox's Bazar", lat: 21.4272, long: 92.0058 },
];

const Home = () => {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);

    // Direct navigation for quick city chips
    const handleQuickSelect = (city) => {
        navigate("/weather", { state: { location: city } });
    };

    return (
        <div className="relative min-h-[85vh] flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Ambient Background Blur Layers */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />

            {/* Main Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center max-w-xl mx-auto p-6 space-y-8"
            >
                {/* Logo Banner */}
                <div className="inline-flex items-center justify-center p-2 rounded-full bg-white/60 backdrop-blur-md border border-sky-100 shadow-xs">
                    <Logo />
                </div>

                {/* Hero Title */}
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold tracking-wide">
                        <Sparkles size={14} />
                        <span>Live Weather Forecasting</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
                        CastKit <span className="text-blue-500">Weather</span>
                    </h1>

                    <p className="text-base md:text-lg text-slate-600 font-medium max-w-md mx-auto">
                        Real-time forecasts, atmospheric metrics, and dynamic conditions for cities across Bangladesh and worldwide.
                    </p>
                </div>

                {/* Main Action Button */}
                <div>
                    <button
                        type="button"
                        onClick={() => setClick(true)}
                        className="inline-flex items-center gap-2.5 rounded-full bg-blue-500 hover:bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                        <Search size={20} />
                        <span>Search Weather</span>
                    </button>
                </div>

                {/* Quick Select City Chips */}
                <div className="space-y-3 pt-4 border-t border-slate-200/60">
                    <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 block">
                        Popular cities in Bangladesh
                    </span>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {POPULAR_CITIES.map((city) => (
                            <button
                                key={city.name}
                                type="button"
                                onClick={() => handleQuickSelect(city)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-slate-200/80 text-sm font-medium text-slate-700 shadow-2xs hover:shadow-xs hover:border-blue-300 transition cursor-pointer"
                            >
                                <MapPin size={14} className="text-blue-500" />
                                <span>{city.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Location Search Modal */}
            {click && <LocationModal onClose={() => setClick(false)} />}
        </div>
    );
};

export default Home;