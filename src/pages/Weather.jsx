import { useLocation } from "react-router";
import { getWeather } from "../services/getWeather";
import { useEffect, useState } from "react";
import { MapPin, Droplets, Wind, Thermometer } from "lucide-react";
import { getWeatherRecommendation } from "../services/weatherRecommendations";
import { motion, AnimatePresence } from "framer-motion";
import { WeatherVisual } from "../components/WeatherVisual";
import WeatherLoader from "../components/WeatherLoader";
import ErrorState from "../components/ErrorState";

const Weather = () => {
    const { state } = useLocation();
    const place = state?.location;
    const [error, setError] = useState("");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!place) return;

        const loadWeather = async () => {
            setError("");
            setWeather(null);

            try {
                const result = await getWeather(place);
                setWeather(result);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Could not load weather.");
            }
        };

        loadWeather();
    }, [place]);

    if (!place) return <ErrorState type="no-location" message="Please choose a location to view the weather forecast." />;
    if (error) return <ErrorState type="error" message={error} />; 
    if (!weather) return <WeatherLoader />;

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Column 1: Details & Recommendation */}
                <div className="space-y-4">
                    {/* Main Details Card */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-blue-500">
                                Today's <span className="text-blue-400">Weather</span> Details
                            </h1>
                            <div className="flex items-center gap-2 text-gray-700">
                                <MapPin size={28} className="text-blue-400 shrink-0" />
                                <h2 className="text-3xl font-bold">
                                    {place?.name}
                                </h2>
                            </div>
                        </div>

                        <div className="flex items-baseline justify-between border-y border-gray-100 py-4">
                            <div>
                                <h2 className="text-6xl font-extrabold text-blue-500">
                                    {weather?.temperature}°C
                                </h2>
                                <p className="text-lg font-medium text-gray-500 capitalize mt-1">
                                    {weather?.description}
                                </p>
                            </div>
                        </div>

                        {/* Metric Highlights */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
                                <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                                    <Thermometer size={18} className="text-blue-400" />
                                    <span className="text-sm font-medium text-gray-500">Feels Like</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-700">
                                    {weather?.feelsLike}°C
                                </p>
                            </div>

                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
                                <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                                    <Droplets size={18} className="text-blue-400" />
                                    <span className="text-sm font-medium text-gray-500">Humidity</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-700">
                                    {weather?.humidity}%
                                </p>
                            </div>

                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
                                <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                                    <Wind size={18} className="text-blue-400" />
                                    <span className="text-sm font-medium text-gray-500">Wind</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-700">
                                    {weather?.windSpeed} <span className="text-xs font-normal text-gray-500">km/h</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recommendation Card */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 shadow-sm space-y-2">
                        <h3 className="text-base font-bold text-blue-500">
                            Live in {weather?.location || place?.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            {getWeatherRecommendation(weather)?.text}
                        </p>
                    </div>
                </div>

                {/* Column 2: Animated Condition Hero */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center min-h-90"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={weather?.description}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center text-center gap-5"
                        >
                            <WeatherVisual description={weather?.description} />

                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">
                                    Current Condition
                                </p>
                                <h3 className="text-3xl font-bold text-blue-500 capitalize">
                                    {weather?.description}
                                </h3>
                            </div>

                            <div className="rounded-4xl bg-blue-400 px-5 py-2 text-lg font-medium text-gray-700 flex items-center gap-2">
                                <Thermometer size={20} />
                                <span>Feels Like: {weather?.feelsLike}°C</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Weather;