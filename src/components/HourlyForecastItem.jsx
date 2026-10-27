import { createElement } from "react";
import { Droplets, Moon, Sun } from "lucide-react";
import { getWeatherDescription } from "../services/getWeather";
import { formatTemperature, getForecastIcon, getHourLabel } from "../utils/forecastFormatting";

const HourlyForecastItem = ({ hour, theme }) => {
    const hourNum = hour.time.slice(11, 13);
    const description = getWeatherDescription(hour.weatherCode);
    const icon = createElement(getForecastIcon(hour.weatherCode, hourNum), {
        size: 20,
        "aria-hidden": true,
        className: theme.textColor,
    });
    const hourLabel = getHourLabel(hour.time);
    const temperature = formatTemperature(hour.temperature);
    const rainChance = hour.precipitationProbability ?? "--";
    const timeOfDay = hour.isDay ? "daytime" : "nighttime";

    const ariaLabel = `${hourLabel}, ${timeOfDay}: ${description}, ${temperature}, rain chance ${rainChance}%`;

    return (
        <div
            role="listitem"
            aria-label={ariaLabel}
            className={`flex min-w-20 flex-col items-center gap-2 rounded-2xl border px-3 py-3 text-center ${theme.metricBg}`}
        >
            <div className="flex w-full items-center justify-between gap-1">
                <span className={`text-xs font-medium opacity-70 ${theme.titleColor}`}>{hourLabel}</span>
                <span
                    title={hour.isDay ? "Daytime" : "Nighttime"}
                    className={`rounded-full p-1 ${theme.badgeBg}`}
                >
                    {hour.isDay
                        ? <Sun size={12} aria-hidden="true" className={theme.textColor} />
                        : <Moon size={12} aria-hidden="true" className={theme.titleColor} />}
                </span>
            </div>
            {icon}
            <span className={`text-base font-bold ${theme.titleColor}`}>
                {temperature}
            </span>
            {/* Spell out the droplet value so its meaning is clear without the icon. */}
            <span className={`inline-flex items-center gap-1 whitespace-nowrap text-xs opacity-70 ${theme.textColor}`}>
                <Droplets size={12} aria-hidden="true" />
                Rain {rainChance}%
            </span>
        </div>
    );
};

export default HourlyForecastItem;