/**
 * WMO Weather Code Mapping
 * - condition: Stable machine-readable category for application logic.
 * - description: Detailed description corresponding to the WMO code.
 * - label: Short, human-friendly text for UI.
 * - ison: Broad icon category used to select a weather icon.
 */
const WMO_CODES = {
    // CLEAR / CLOUD CONDITIONS
    // ---------------------------------------------------------------------------

    // 0–1: Little to no cloud cover.
    0: {
        condition: "clear",
        description: "Clear sky",
        label: "Clear",
        icon: "clear"
    },

    1: {
        condition: "clear",
        description: "Mainly clear",
        label: "Mostly Clear",
        icon: "clear"
    },

    // 2: Some cloud cover, but the sky is not fully overcast.
    2: {
        condition: "partly_cloudy",
        description: "Partly cloudy",
        label: "Partly Cloudy",
        icon: "partly-cloudy"
    },

    // 3: Sky is completely or nearly completely covered by clouds.
    3: {
        condition: "overcast",
        description: "Overcast",
        label: "Overcast",
        icon: "overcast"
    },

    // FOG
    // ---------------------------------------------------------------------------

    // 45: Standard fog with reduced visibility.
    45: {
        condition: "fog",
        description: "Fog",
        label: "Fog",
        icon: "fog"
    },

    // 48: Fog accompanied by deposition of rime/ice.
    48: {
        condition: "fog",
        description: "Depositing rime fog",
        label: "Rime Fog",
        icon: "fog"
    },

    // DRIZZLE
    // ---------------------------------------------------------------------------

    // 51–55: Liquid drizzle with increasing intensity.
    51: {
        condition: "drizzle",
        description: "Light drizzle",
        label: "Light Drizzle",
        icon: "drizzle"
    },

    53: {
        condition: "drizzle",
        description: "Moderate drizzle",
        label: "Drizzle",
        icon: "drizzle"
    },

    55: {
        condition: "drizzle",
        description: "Dense drizzle",
        label: "Dense Drizzle",
        icon: "drizzle"
    },

    // FREEZING DRIZZLE
    // ---------------------------------------------------------------------------

    // 56–57: Drizzle that freezes on contact with surfaces.
    56: {
        condition: "freezing_drizzle",
        description: "Light freezing drizzle",
        label: "Light Freezing Drizzle",
        icon: "freezing-drizzle"
    },

    57: {
        condition: "freezing_drizzle",
        description: "Dense freezing drizzle",
        label: "Freezing Drizzle",
        icon: "freezing-drizzle"
    },

    // RAIN
    // ---------------------------------------------------------------------------

    // 61–65: Continuous rain, ranging from slight to heavy.
    61: {
        condition: "rain",
        description: "Slight rain",
        label: "Light Rain",
        icon: "rain"
    },

    63: {
        condition: "rain",
        description: "Moderate rain",
        label: "Rain",
        icon: "rain"
    },

    65: {
        condition: "rain",
        description: "Heavy rain",
        label: "Heavy Rain",
        icon: "rain"
    },

    // FREEZING RAIN
    // ---------------------------------------------------------------------------

    // 66–67: Rain that freezes when it reaches the surface.
    66: {
        condition: "freezing_rain",
        description: "Light freezing rain",
        label: "Light Freezing Rain",
        icon: "freezing-rain"
    },

    67: {
        condition: "freezing_rain",
        description: "Heavy freezing rain",
        label: "Heavy Freezing Rain",
        icon: "freezing-rain"
    },

    // SNOWFALL
    // ---------------------------------------------------------------------------

    // 71–75: Continuous snowfall, ranging from slight to heavy.
    71: {
        condition: "snow",
        description: "Slight snowfall",
        label: "Light Snow",
        icon: "snow"
    },

    73: {
        condition: "snow",
        description: "Moderate snowfall",
        label: "Snow",
        icon: "snow"
    },

    75: {
        condition: "snow",
        description: "Heavy snowfall",
        label: "Heavy Snow",
        icon: "snow"
    },

    // 77: Small ice/snow particles rather than normal snowflakes.
    77: {
        condition: "snow",
        description: "Snow grains",
        label: "Snow Grains",
        icon: "snow"
    },

    // RAIN SHOWERS
    // ---------------------------------------------------------------------------

    // 80–82: Intermittent rain showers, ranging from slight to violent.
    80: {
        condition: "rain_showers",
        description: "Slight rain showers",
        label: "Light Rain Showers",
        icon: "rain"
    },

    81: {
        condition: "rain_showers",
        description: "Moderate rain showers",
        label: "Rain Showers",
        icon: "rain"
    },

    82: {
        condition: "rain_showers",
        description: "Violent rain showers",
        label: "Heavy Rain Showers",
        icon: "rain"
    },

    // SNOW SHOWERS
    // ---------------------------------------------------------------------------

    // 85–86: Intermittent snowfall/shower activity.
    85: {
        condition: "snow_showers",
        description: "Slight snow showers",
        label: "Light Snow Showers",
        icon: "snow"
    },

    86: {
        condition: "snow_showers",
        description: "Heavy snow showers",
        label: "Heavy Snow Showers",
        icon: "snow"
    },

    // THUNDERSTORMS
    // ---------------------------------------------------------------------------

    // 95: Thunderstorm without hail specified.
    95: {
        condition: "thunderstorm",
        description: "Thunderstorm",
        label: "Thunderstorm",
        icon: "thunderstorm"
    },

    // 96: Thunderstorm accompanied by slight hail.
    96: {
        condition: "thunderstorm_hail",
        description: "Thunderstorm with slight hail",
        label: "Thunderstorm with Hail",
        icon: "thunderstorm"
    },

    // 97: Heavy/strong thunderstorm without hail specified.
    97: {
        condition: "thunderstorm",
        description: "Heavy thunderstorm",
        label: "Heavy Thunderstorm",
        icon: "thunderstorm"
    },

    // 99: Thunderstorm accompanied by heavy hail.
    99: {
        condition: "thunderstorm_hail",
        description: "Thunderstorm with heavy hail",
        label: "Thunderstorm with Hail",
        icon: "thunderstorm"
    }
};

const isNumber = (value) => typeof value === "number" && Number.isFinite(value);

export const getWeather = async (place) => {
    const { name, lat, long } = place ?? {};

    if (!isNumber(lat) || !isNumber(long)) {
        throw new Error("Location coordinates are missing or invalid.");
    }

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}` +
        `&current=temperature_2m,is_day,wind_speed_10m,weather_code,relative_humidity_2m,apparent_temperature,wind_direction_10m,precipitation,rain,showers,snowfall,surface_pressure`;

    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Weather request failed (${result.status}).`);
    }

    const data = await result.json();
    const now = data?.current;

    if (!now) {
        throw new Error("Weather response did not contain current conditions.");
    }

    const weatherCode = Number(now.weather_code);
    if (!Number.isFinite(weatherCode)) {
        throw new Error("Weather code is missing or invalid.");
    }

    const weather = WMO_CODES[weatherCode];
    if (!weather) {
        throw new Error(`Unsupported weather code: ${weatherCode}.`);
    }

    const temperature = Number(now.temperature_2m);
    const humidity = Number(now.relative_humidity_2m);
    const windSpeed = Number(now.wind_speed_10m);
    const feelsLike = Number(now.apparent_temperature);

    if (
        !Number.isFinite(temperature) ||
        !Number.isFinite(humidity) ||
        !Number.isFinite(windSpeed) ||
        !Number.isFinite(feelsLike)
    ) {
        throw new Error("Some weather values are missing or invalid.");
    }

    const icon = weather.icon === "clear" && now.is_day === 0 ? "clear_night" : weather.icon;

    return {
        location: name,
        temperature: Math.round(temperature),
        humidity,
        windSpeed,
        feelsLike: Math.round(feelsLike),
        condition: weather.condition,
        description: weather.description,
        conditionLabel: weather.label,
        icon,
    };
};
