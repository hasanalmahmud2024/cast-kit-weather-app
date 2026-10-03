import { Droplets, Thermometer, Wind, Gauge, CloudRain, Compass } from "lucide-react";
import MetricCard from "./MetricCard";
import { getWeatherTheme } from "../utils/weatherThemes";

const WeatherCard = ({ weather }) => {
    const theme = getWeatherTheme(weather?.condition, weather?.description, weather?.isDay);

    const primaryMetrics = [
        { icon: Thermometer, label: "Feels Like", value: weather?.feelsLike, unit: "°C" },
        { icon: Droplets, label: "Humidity", value: weather?.humidity, unit: "%" },
        { icon: Wind, label: "Wind Speed", value: weather?.windSpeed, unit: "km/h" },
    ];

    const atmosphericMetrics = [
        { icon: Gauge, label: "Pressure", value: weather?.surfacePressure, unit: "hPa" },
        { icon: CloudRain, label: "Precipitation", value: weather?.precipitation, unit: "mm" },
        { icon: Compass, label: "Wind Dir.", value: weather?.windDirection, unit: "°" },
    ];

    return (
        <div className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 space-y-5 ${theme.cardBg}`}>
            <h2 className={`text-lg font-bold tracking-wide ${theme.titleColor}`}>
                Condition Metrics
            </h2>

            {/* Primary Metrics */}
            <div className="space-y-2">
                <span className="text-xs font-semibold tracking-wider uppercase opacity-60">Overview</span>
                <div className="grid grid-cols-3 gap-3">
                    {primaryMetrics.map((metric) => (
                        <MetricCard
                            key={metric.label}
                            {...metric}
                            metricBg={theme.metricBg}
                            textColor={theme.textColor}
                        />
                    ))}
                </div>
            </div>

            {/* Atmospheric Metrics */}
            <div className="space-y-2">
                <span className="text-xs font-semibold tracking-wider uppercase opacity-60">Atmosphere</span>
                <div className="grid grid-cols-3 gap-3">
                    {atmosphericMetrics.map((metric) => (
                        <MetricCard
                            key={metric.label}
                            {...metric}
                            metricBg={theme.metricBg}
                            textColor={theme.textColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;