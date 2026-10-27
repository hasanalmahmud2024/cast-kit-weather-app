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
            className={`grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2 rounded-2xl border px-3 py-3 sm:flex sm:flex-col sm:justify-center sm:text-center ${theme.metricBg}`}
        >
            <div className="min-w-0 sm:space-y-1">
                <p className={`text-sm font-semibold ${theme.titleColor}`}>{dayLabel}</p>
                <p className={`text-xs opacity-70 ${theme.textColor}`}>{dateFormatted}</p>
            </div>

            {icon}

            <div className="col-span-2 flex flex-wrap gap-x-2 text-xs sm:justify-center sm:text-sm">
                <span className={`font-bold ${theme.titleColor}`}>High {highTemp}</span>
                <span className={`opacity-70 ${theme.textColor}`}>Low {lowTemp}</span>
            </div>

            <span className={`col-span-2 inline-flex items-center gap-1 whitespace-nowrap text-xs opacity-70 ${theme.textColor}`}>
                <Droplets size={12} aria-hidden="true" />
                Rain {rainChance}%
            </span>
        </div>
    );
};

export default DailyForecastItem;