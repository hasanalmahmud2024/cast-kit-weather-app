import { getWeatherTheme } from "../utils/weatherThemes";
import HourlyForecastItem from "./HourlyForecastItem";
import DailyForecastItem from "./DailyForecastItem";

const ForecastCard = ({ weather }) => {
    const theme = getWeatherTheme(weather?.condition, weather?.description, weather?.isDay);

    return (
        <section
            aria-label="Weather forecast"
            className={`space-y-6 rounded-3xl border p-5 shadow-sm backdrop-blur-md md:p-6 ${theme.cardBg}`}
        >
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <h2 className={`text-lg font-bold tracking-wide ${theme.titleColor}`}>Today, by the hour</h2>
                    <span className={`text-xs font-medium opacity-70 ${theme.textColor}`}>Local time</span>
                </div>

                {/* List roles make the forecast tiles easier to browse with a screen reader. */}
                <div
                    role="list"
                    aria-label="Hourly forecast"
                    className="scrollbar-hidden flex gap-3 overflow-x-auto pb-2"
                >
                    {weather?.hourlyForecast?.map((hour) => (
                        <HourlyForecastItem key={hour.time} hour={hour} theme={theme} />
                    ))}
                </div>
            </div>

            <div className="space-y-3 border-t border-current/20 pt-5">
                <h2 className={`text-lg font-bold tracking-wide ${theme.titleColor}`}>Next 7 days</h2>
                <div role="list" aria-label="Daily forecast" className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
                    {weather?.dailyForecast?.map((day, index) => (
                        <DailyForecastItem
                            key={day.date}
                            day={day}
                            isToday={index === 0}
                            theme={theme}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ForecastCard;