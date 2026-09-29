import { LocateFixed, X, Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { getGeoLocation } from "../services/getGeoLocation";
import { useNavigate } from "react-router";

const LocationModal = ({ onClose }) => {
    const navigate = useNavigate();
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Navigates to the weather page with the selected location payload
    const goToPage = (location) => {
        navigate("/weather", { state: { location } });
    };

    // Submits manual city input and requests geo coordinates
    const handleSubmit = async (e) => {
        e.preventDefault();
        const value = city.trim();

        if (!value) {
            setError("Please enter a city name.");
            return;
        }

        setError("");
        setLoading(true);

        try {

            // Convert the city to latitude/longitude before requesting weather data.
            const location = await getGeoLocation(value);
            if (!location) {
                setError("Could not find location coordinates.");
            } else {
                goToPage(location);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not find that city.");
        } finally {
            setLoading(false);
        }
    };

    // Triggers device location via browser Geolocation API
    const handleGeolocation = () => {
        if (!navigator.geolocation) {
            setError("Your browser does not support geolocation.");
            return;
        }

        setError("");
        setLoading(true);

        navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                goToPage({ name: "Your Location", lat: latitude, long: longitude });
            },
            (err) => {
                setError(err.message || "Could not access your location.");
                setLoading(false);
            },
            { timeout: 10000 }
        );
    };

    return (
        /* Dark backdrop overlay */
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/60 z-50 p-4">
            {/* Modal card container with responsive max-width */}
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-6 space-y-6 border border-gray-100">
                {/* Header row with title & close button */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Where are you today?</h2>
                    <button
                        onClick={onClose}
                        type="button"
                        className="cursor-pointer rounded-full p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* City Search Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Search Input with inline icon */}
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter your city name..."
                            className="pl-11 pr-4 py-2.5 border border-gray-200 rounded-4xl w-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 font-medium placeholder:text-gray-400 transition-all"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Primary submit button with loading spinner */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-4xl w-full bg-blue-500 hover:bg-blue-600 active:scale-98 px-5 py-2.5 text-md font-medium text-white shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <span>Check Weather</span>}
                    </button>
                </form>

                {/* Section divider */}
                <div className="relative flex items-center justify-center">
                    <div className="w-full border-t border-gray-100"></div>
                    <span className="bg-white px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 absolute">
                        or
                    </span>
                </div>

                {/* Secondary geolocation trigger button */}
                <div>
                    <button
                        type="button"
                        onClick={handleGeolocation}
                        disabled={loading}
                        className="rounded-4xl w-full text-blue-500 border-2 border-blue-500 hover:bg-blue-50 active:scale-98 px-5 py-2.5 text-md font-medium bg-white transition-all cursor-pointer disabled:opacity-70"
                    >
                        <div className="flex justify-center items-center gap-2">
                            <LocateFixed size={18} />
                            <span>Use My Location</span>
                        </div>
                    </button>
                </div>

                {/* Conditional error message readout */}
                {error && (
                    <p className="text-sm text-red-500 font-medium text-center pt-1">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

export default LocationModal;