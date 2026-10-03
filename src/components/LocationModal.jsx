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

        if (onClose) onClose();
    };

    // Submits manual city input and requests geo coordinates
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent empty searches and duplicate error states
        const trimmedCity = city.trim();
        if (!trimmedCity) {
            setError("Please enter a city name.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const location = await getGeoLocation(trimmedCity);

            // Guard in case the API returns an unexpected empty payload
            if (!location) {
                throw new Error("No location data was returned for that city.");
            }

            goToPage(location);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not find that city.");
        } finally {
            setLoading(false);
        }
    };

    // Triggers device location via browser Geolocation API
    const handleGeolocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by this browser.");
            return;
        }

        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            // successCallback
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    // make the location object simple for the weather page
                    goToPage({
                        name: "Current Location",
                        lat: latitude,
                        long: longitude,
                    });
                } catch (err) {
                    setError(err instanceof Error ? err.message : "Unable to fetch your location.");
                } finally {
                    setLoading(false);
                }
            },
            // errorCallback
            (geoError) => {
                setError(
                    geoError.message || "Location access was denied. Please search for a city instead."
                );
                setLoading(false);
            },
            // options
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-sky-100 p-2 text-sky-600">
                            <LocateFixed size={18} />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-800">Choose a location</h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">City</span>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Search by city"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white"
                        />
                    </label>

                    {error && (
                        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 font-medium text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-sky-400"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                            {loading ? "Searching..." : "Search"}
                        </button>

                        <button
                            type="button"
                            onClick={handleGeolocation}
                            disabled={loading}
                            className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                            aria-label="Use current location"
                        >
                            <LocateFixed size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LocationModal;