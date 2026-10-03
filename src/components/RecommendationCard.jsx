import { motion } from "framer-motion";
import { Sun, Umbrella, Snowflake, Zap, Cloud, Sparkles, Shirt, Activity, AlertTriangle } from "lucide-react";
import { getWeatherTheme } from "../utils/weatherThemes";

// Helper to select an icon based on condition key
const getRecommendationIcon = (condition = "") => {
    const c = condition.toLowerCase();

    if (c.includes("rain") || c.includes("drizzle")) return Umbrella;
    if (c.includes("snow")) return Snowflake;
    if (c.includes("thunder") || c.includes("storm")) return Zap;
    if (c.includes("cloud") || c.includes("overcast") || c.includes("fog")) return Cloud;
    if (c.includes("clear") || c.includes("sunny")) return Sun;

    return Sparkles;
};

const RecommendationCard = ({ weather, place, recommendation }) => {
    const theme = getWeatherTheme(weather?.condition, weather?.description, weather?.isDay);
    const ConditionIcon = getRecommendationIcon(weather?.condition || weather?.description);

    if (!recommendation) return null;

    return (
        <div className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 space-y-5 ${theme.cardBg}`}>
            {/* Ambient Corner Glow */}
            <div className={`absolute -right-12 -bottom-12 h-44 w-44 rounded-full blur-3xl pointer-events-none ${theme.glowBg}`} />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Condition Action Badge */}
                <div className={`flex items-center gap-2.5 rounded-2xl px-4 py-2 text-sm font-semibold shadow-xs ${theme.badgeBg}`}>
                    {recommendation.level === "alert" ? (
                        <AlertTriangle size={18} className="text-red-400" />
                    ) : (
                        <ConditionIcon size={18} />
                    )}
                    <span>{recommendation.actionBadge}</span>
                </div>

                <span className="text-xs font-semibold tracking-wider uppercase opacity-60">
                    Live in {weather?.location || place?.name}
                </span>
            </div>

            {/* Main Statement */}
            <div className="relative z-10 space-y-1">
                <p className="text-base md:text-lg opacity-90 leading-relaxed font-semibold">
                    {recommendation.text}
                </p>
            </div>

            {/* Dynamic Outfit & Activity Sub-Details */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-500/20">
                {recommendation.outfitAdvice && (
                    <div className={`rounded-2xl p-3 border space-y-1 ${theme.metricBg}`}>
                        <div className="flex items-center gap-1.5 text-xs font-semibold opacity-70">
                            <Shirt size={14} className={theme.textColor} />
                            <span>Recommended Gear</span>
                        </div>
                        <p className="text-xs md:text-sm font-medium opacity-90">
                            {recommendation.outfitAdvice}
                        </p>
                    </div>
                )}

                {recommendation.activityAdvice && (
                    <div className={`rounded-2xl p-3 border space-y-1 ${theme.metricBg}`}>
                        <div className="flex items-center gap-1.5 text-xs font-semibold opacity-70">
                            <Activity size={14} className={theme.textColor} />
                            <span>Suggested Activity</span>
                        </div>
                        <p className="text-xs md:text-sm font-medium opacity-90">
                            {recommendation.activityAdvice}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationCard;