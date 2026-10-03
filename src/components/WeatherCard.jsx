import { Droplets, MapPin, Thermometer, Wind } from "lucide-react";
import MetricCard from "./MetricCard";
import { getWeatherTheme } from "../utils/weatherThemes";

const WeatherCard = ({ place, weather }) => {
    // Pass condition and description for reliable theme matching
    const theme = getWeatherTheme(weather?.condition, weather?.description);

    const metrics = [
        { icon: Thermometer, label: "Feels Like", value: weather?.feelsLike, unit: "°C" },
        { icon: Droplets, label: "Humidity", value: weather?.humidity, unit: "%" },
        { icon: Wind, label: "Wind", value: weather?.windSpeed, unit: "km/h" },
    ];

    return (
        <div className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 space-y-6 ${theme.cardBg}`}>
            {/* Ambient Glow */}
            <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full blur-2xl pointer-events-none ${theme.glowBg}`} />

            <div className="relative space-y-2">
                <h1 className={`text-2xl font-bold ${theme.titleColor}`}>
                    Today's <span className={theme.textColor}>Weather</span> Details
                </h1>
                <div className="flex items-center gap-2">
                    <MapPin size={28} className={`${theme.textColor} shrink-0`} />
                    <h2 className={`text-3xl font-bold ${theme.titleColor}`}>{place?.name}</h2>
                </div>
            </div>

            <div className="relative flex items-baseline justify-between border-y border-gray-500/20 py-4">
                <div>
                    <h2 className={`text-6xl font-extrabold ${theme.textColor}`}>
                        {weather?.temperature}°C
                    </h2>
                    <p className="text-lg font-medium opacity-80 capitalize mt-1">
                        {weather?.description}
                    </p>
                </div>
            </div>

            {/* Metric Highlights */}
            <div className="relative grid grid-cols-3 gap-3">
                {metrics.map((metric) => (
                    <MetricCard
                        key={metric.label}
                        {...metric}
                        metricBg={theme.metricBg}
                        textColor={theme.textColor}
                    />
                ))}
            </div>
        </div>
    );
};

export default WeatherCard;