import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import LocationModal from "./LocationModal";
import { getWeatherTheme } from "../utils/weatherThemes";

const Header = ({ weather }) => {
    const navigate = useNavigate();
    // Local state to toggle the Location Modal overlay
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Compute active weather theme matching the current weather condition
    const theme = getWeatherTheme(weather?.condition, weather?.description);

    return (
        <>
            {/* Main Header Container with dynamic weather card styling */}
            <header className={`flex items-center justify-between rounded-3xl border p-4 shadow-sm mb-6 transition-all duration-300 ${theme.cardBg}`}>

                {/* Left Section: Back Home Button & App Brand */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition cursor-pointer ${theme.metricBg} ${theme.titleColor}`}
                        aria-label="Back to Home"
                    >
                        <ArrowLeft size={18} />
                        <span className="hidden sm:inline">Home</span>
                    </button>

                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                        <div className={`text-xl font-bold hidden md:inline ${theme.titleColor}`}>
                            CastKit <span className={theme.textColor}>Weather</span>
                        </div>
                    </div>
                </div>

                {/* Right Section: Search New Location Button */}
                <div>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer ${theme.badgeBg}`}
                    >
                        <Search size={18} />
                        <span>Search Location</span>
                    </button>
                </div>
            </header>

            {/* Location Search Modal Popup */}
            {isModalOpen && <LocationModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default Header;