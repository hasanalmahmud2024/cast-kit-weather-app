import { motion, AnimatePresence } from "framer-motion";
import { WeatherVisual } from "../components/WeatherVisual";
import { Thermometer } from "lucide-react";
import { getWeatherTheme } from "../utils/weatherThemes";

const WeatherType = ({ weather }) => {
    const theme = getWeatherTheme(weather?.condition || weather?.description);

    return (
        <div className="h-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`relative overflow-hidden flex h-full flex-col items-center justify-center rounded-3xl border p-6 transition-all duration-300 ${theme.cardBg} ${theme.gradient}`}
            >
                {/* Ambient Center Glow */}
                <div className={`absolute h-48 w-48 rounded-full blur-3xl pointer-events-none ${theme.glowBg}`} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={weather?.description}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 flex flex-col items-center text-center gap-5"
                    >
                        {/* Dynamic Icon Visual */}
                        <WeatherVisual description={weather?.description} />

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">
                                Current Condition
                            </p>
                            <h3 className={`text-3xl font-bold capitalize ${theme.textColor}`}>
                                {weather?.description}
                            </h3>
                        </div>

                        {/* Theme Badge */}
                        <div className={`rounded-4xl px-5 py-2 text-lg font-medium flex items-center gap-2 shadow-xs ${theme.badgeBg}`}>
                            <Thermometer size={20} />
                            <span>Feels Like: {weather?.feelsLike}°C</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default WeatherType;