import { createElement } from "react";
import { Droplets } from "lucide-react";
import { getWeatherDescription } from "../services/getWeather";
import { formatTemperature, getDateFromLocalDate, getForecastIcon } from "../utils/forecastFormatting";

const DailyForecastItem = ({ day, isToday, theme }) => {
    const icon = createElement(getForecastIcon(day.weatherCode), {
        size: 20,
        "aria-hidden": true,
        className: `shrink-0 ${theme.textColor}`,
    });
    const description = getWeatherDescription(day.weatherCode);
    const dayLabel = isToday ? "Today" : getDateFromLocalDate(day.date, { weekday: "short" });
    const dateFormatted = getDateFromLocalDate(day.date, { month: "short", day: "numeric" });
    const highTemp = formatTemperature(day.high);
    const lowTemp = formatTemperature(day.low);
    const rainChance = day.precipitationProbability ?? "--";

    const ariaLabel = `${dayLabel}, ${description}, high ${highTemp}, low ${lowTemp}, rain chance ${rainChance}%`;

    return (
        <div
            role="listitem"
            aria-label={ariaLabel}
            className={`flex items-center justify-between gap-2 rounded-2xl border px-3 py-3 sm:flex-col sm:justify-center sm:text-center ${theme.metricBg}`}
        >
            <div className="sm:space-y-1">
                <p className={`text-sm font-semibold ${theme.titleColor}`}>{dayLabel}</p>
                <p className={`text-xs opacity-70 ${theme.textColor}`}>{dateFormatted}</p>
            </div>

            {icon}

            <div className="flex gap-2 text-sm sm:justify-center">
                <span className={`font-bold ${theme.titleColor}`}>High {highTemp}</span>
                <span className={`opacity-70 ${theme.textColor}`}>Low {lowTemp}</span>
            </div>

            <span className={`inline-flex items-center gap-1 whitespace-nowrap text-xs opacity-70 ${theme.textColor}`}>
                <Droplets size={12} aria-hidden="true" />
                Rain {rainChance}%
            </span>
        </div>
    );
};

export default DailyForecastItem;