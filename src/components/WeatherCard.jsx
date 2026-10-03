import { Droplets, MapPin, Thermometer, Wind } from "lucide-react";
import MetricCard from "./MetricCard";

const WeatherCard = ({ place, weather }) => {
    const metrics = [
        { icon: Thermometer, label: "Feels Like", value: weather?.feelsLike, unit: "°C" },
        { icon: Droplets, label: "Humidity", value: weather?.humidity, unit: "%" },
        { icon: Wind, label: "Wind", value: weather?.windSpeed, unit: "km/h" },
    ];

    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-blue-500">
                    Today's <span className="text-blue-400">Weather</span> Details
                </h1>
                <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={28} className="text-blue-400 shrink-0" />
                    <h2 className="text-3xl font-bold">{place?.name}</h2>
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
                
                {metrics.map((metric) => (
                    <MetricCard key={metric.label} {...metric} />
                ))}
            </div>
        </div>
    );
};

export default WeatherCard;