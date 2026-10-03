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
    // Get dynamic page theme based on both condition code and description text
    const theme = getWeatherTheme(weather?.condition, weather?.description);

    return (
        <div className={`min-h-screen transition-colors duration-500 p-4 -m-4 ${theme.pageBg}`}>
            <div className="mx-auto flex max-w-5xl flex-col space-y-6">
                <Header weather={weather}/>

                <div className="grid flex-1 gap-6 md:grid-cols-2">
                    {/* Column 1: Details & Recommendation */}
                    <div className="space-y-4">
                        <WeatherCard place={place} weather={weather} />
                        {recommendation && (
                            <RecommendationCard
                                weather={weather}
                                place={place}
                                recommendation={recommendation}
                            />
                        )}
                    </div>

                    {/* Column 2: Animated Condition Hero */}
                    <WeatherType weather={weather} />
                </div>
            </div>
        </div>
    );
};

export default Weather;