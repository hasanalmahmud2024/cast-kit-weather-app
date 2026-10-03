import { useLocation } from "react-router";
import { getWeather } from "../services/getWeather";
import { useEffect, useState } from "react";
import { getWeatherRecommendation } from "../services/weatherRecommendations";
import WeatherLoader from "../components/WeatherLoader";
import ErrorState from "../components/ErrorState";
import WeatherCard from "../components/WeatherCard";
import RecommendationCard from "../components/RecommendationCard";
import WeatherType from "../components/WeatherType";

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
                    <WeatherCard weather={weather} place={place}/>

                    {/* Recommendation Card */}
                    <RecommendationCard weather={weather} place={place} recommmendation={getWeatherRecommendation(weather)}/>
                </div>

                {/* Column 2: Animated Condition Hero */}
                <WeatherType weather={weather}/>
            </div>
        </div>
    );
};

export default Weather;