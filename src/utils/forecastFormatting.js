import {
    Cloud,
    CloudDrizzle,
    CloudLightning,
    CloudRain,
    CloudSnow,
    CloudSun,
    Moon,
    Sun,
} from "lucide-react";

export const formatTemperature = (temperature) =>
    temperature === null || temperature === undefined ? "--°" : `${Math.round(temperature)}°`;

export const getDateFromLocalDate = (date, options) => {
    const [year, month, day] = date.split("-").map(Number);
    // Keep date-only forecast values on the same calendar day in every browser timezone.
    return new Intl.DateTimeFormat(undefined, { timeZone: "UTC", ...options }).format(
        new Date(Date.UTC(year, month - 1, day))
    );
};

export const getHourLabel = (time) => {
    const hour = Number(time.slice(11, 13));
    return new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        timeZone: "UTC",
    }).format(new Date(Date.UTC(2020, 0, 1, hour)));
};

export const getForecastIcon = (weatherCode, hour) => {
    if (weatherCode === null || weatherCode === undefined || weatherCode === "") return Cloud;

    const code = Number(weatherCode);
    if (!Number.isFinite(code)) return Cloud;

    // Open-Meteo uses WMO codes; group related codes under a shared icon.
    if (code >= 95) return CloudLightning;
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return CloudSnow;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
        return code <= 55 ? CloudDrizzle : CloudRain;
    }
    if (code === 0) {
        const hourOfDay = hour === undefined ? 12 : Number(hour);
        return hourOfDay < 6 || hourOfDay >= 19 ? Moon : Sun;
    }
    if (code === 1 || code === 2) return CloudSun;

    return Cloud;
};