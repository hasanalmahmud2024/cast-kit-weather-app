import { getWeatherTheme } from "../utils/weatherThemes";

const RecommendationCard = ({ weather, place, recommendation }) => {
    // Retrieve theme matching current weather condition
    const theme = getWeatherTheme(weather?.condition || weather?.description);

    return (
        <div className={`relative overflow-hidden rounded-3xl border p-5 transition-all duration-300 space-y-2 ${theme.cardBg} ${theme.gradient}`}>
            {/* Ambient Background Glow */}
            <div className={`absolute -left-10 -bottom-10 h-32 w-32 rounded-full blur-2xl pointer-events-none ${theme.glowBg}`} />

            <div className="relative z-10 space-y-1">
                <h3 className={`text-base font-bold ${theme.textColor}`}>
                    Live in {weather?.location || place?.name}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                    {recommendation?.text}
                </p>
            </div>
        </div>
    );
};

export default RecommendationCard;