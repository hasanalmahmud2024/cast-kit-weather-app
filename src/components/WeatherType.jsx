import { motion, AnimatePresence } from "framer-motion";
import { WeatherVisual } from "../components/WeatherVisual";
import { Thermometer, Moon, Sun, MapPin } from "lucide-react";
import { getWeatherTheme } from "../utils/weatherThemes";

const WeatherType = ({ weather, place }) => {
    // Determine active weather theme including condition, description, and day/night state
    const theme = getWeatherTheme(weather?.condition, weather?.description, weather?.isDay);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`relative overflow-hidden rounded-3xl border p-6 md:p-8 transition-all duration-300 ${theme.cardBg}`}
        >
            {/* Ambient Background Glow */}
            <div className={`absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl pointer-events-none ${theme.glowBg}`} />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left Side: Location, Day/Night Indicator & Big Temperature */}
                <div className="space-y-3 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 text-sm font-medium opacity-80">
                        <MapPin size={18} className={theme.textColor} />
                        <span>{place?.name}</span>
                        <span className="opacity-40">•</span>
                        {weather?.isDay ? <Sun size={16} /> : <Moon size={16} />}
                        <span>{weather?.isDay ? "Daytime" : "Nighttime"}</span>
                    </div>

                    <div className="flex items-baseline justify-center md:justify-start gap-3">
                        <h1 className={`text-6xl md:text-7xl font-extrabold tracking-tight ${theme.textColor}`}>
                            {weather?.temperature}°C
                        </h1>
                        <p className={`text-xl font-semibold capitalize ${theme.titleColor}`}>
                            {weather?.description}
                        </p>
                    </div>

                    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${theme.badgeBg}`}>
                        <Thermometer size={16} />
                        <span>Feels like {weather?.feelsLike}°C</span>
                    </div>
                </div>

                {/* Right Side: Animated Weather Visual */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={weather?.description}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0"
                    >
                        <WeatherVisual description={weather?.description} isDay={weather?.isDay} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default WeatherType;