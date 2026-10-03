import { useLocation } from "react-router";
import { getWeather } from "../services/getWeather";
import { useEffect, useState } from "react";
import { getWeatherRecommendation } from "../services/weatherRecommendations";
import WeatherLoader from "../components/WeatherLoader";
import ErrorState from "../components/ErrorState";
import WeatherCard from "../components/WeatherCard";
import RecommendationCard from "../components/RecommendationCard";
import WeatherType from "../components/WeatherType";
import Header from "../components/Header";
import WeatherParticles from "../components/WeatherParticles";
import { getWeatherTheme } from "../utils/weatherThemes";

const Weather = () => {
    const { state } = useLocation();
    const place = state?.location;
    const [error, setError] = useState("");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!place) return;

        let cancelled = false;

        const loadWeather = async () => {
            try {
                setError("");
                const nextWeather = await getWeather(place);

                if (!cancelled) {
                    setWeather(nextWeather);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : "Unable to load the weather.");
                }
            }
        };

        loadWeather();

        return () => {
            cancelled = true;
        };
    }, [place]);

    if (!place) return <ErrorState type="no-location" message="Please choose a location to view the weather forecast." />;
    if (error) return <ErrorState type="error" message={error} />;
    if (!weather) return <WeatherLoader />;

    const recommendation = getWeatherRecommendation(weather);
    const theme = getWeatherTheme(weather?.condition, weather?.description, weather?.isDay);

    return (
        <div className={`relative w-full min-h-screen transition-colors duration-500 p-4 md:p-8 ${theme.pageBg}`}>
            <WeatherParticles weather={weather} />

            <div className="relative z-10 mx-auto max-w-5xl space-y-6">
                {/* Navigation Header */}
                <Header weather={weather} />

                {/* Top Row: Full-Width Animated Condition Hero */}
                <WeatherType weather={weather} place={place} />

                {/* Bottom Row: Balanced 2-Column Details */}
                <div className="grid gap-6 md:grid-cols-2 items-start">
                    {/* Left Column: 6-Metric Highlights */}
                    <WeatherCard place={place} weather={weather} />

                    {/* Right Column: Live Recommendation */}
                    {recommendation && (
                        <RecommendationCard
                            weather={weather}
                            place={place}
                            recommendation={recommendation}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Weather;