/**
 * Recommendations use the stable condition identifiers returned by getWeather.
 * Keep these keys in sync with the condition values in WMO_CODES.
 */
export const WEATHER_RECOMMENDATIONS = {
    clear: {
        type: "clear",
        label: "Clear",
        text: "Enjoy the clear weather. Consider sun protection if you'll be outside for a while."
    },
    partly_cloudy: {
        type: "partly_cloudy",
        label: "Partly Cloudy",
        text: "Conditions look comfortable for outdoor plans."
    },
    overcast: {
        type: "overcast",
        label: "Overcast",
        text: "It may feel dim or cool under the clouds. Bring an extra layer if needed."
    },
    fog: {
        type: "fog",
        label: "Fog",
        text: "Visibility may be reduced. Allow extra time and use caution while driving."
    },
    drizzle: {
        type: "drizzle",
        label: "Drizzle",
        text: "Light rain is possible. Consider bringing a light rain jacket or umbrella."
    },
    freezing_drizzle: {
        type: "freezing_drizzle",
        label: "Freezing Drizzle",
        text: "Freezing drizzle can make surfaces slippery. Use caution outdoors and on the road."
    },
    rain: {
        type: "rain",
        label: "Rain",
        text: "Rain is expected. Bring an umbrella or waterproof clothing."
    },
    freezing_rain: {
        type: "freezing_rain",
        label: "Freezing Rain",
        text: "Freezing rain can create dangerous icy surfaces. Check local conditions before traveling."
    },
    snow: {
        type: "snow",
        label: "Snow",
        text: "Snow may affect travel and make surfaces slippery. Allow extra time and use caution."
    },
    rain_showers: {
        type: "rain_showers",
        label: "Rain Showers",
        text: "Showers may come and go. Keep rain protection handy."
    },
    snow_showers: {
        type: "snow_showers",
        label: "Snow Showers",
        text: "Snow showers may reduce visibility or make surfaces slippery. Take care while traveling."
    },
    thunderstorm: {
        type: "thunderstorm",
        label: "Thunderstorm",
        text: "Seek shelter indoors during thunderstorms and follow local weather alerts."
    },
    thunderstorm_hail: {
        type: "thunderstorm_hail",
        label: "Thunderstorm with Hail",
        text: "Stay indoors and away from windows during hail. Follow local weather alerts."
    }
};

/**
 * Accepts either a weather object or a condition string.
 * Returns null when no condition is provided.
 */
export const getWeatherRecommendation = (weatherOrCondition) => {
    const condition =
        typeof weatherOrCondition === "string"
            ? weatherOrCondition
            : weatherOrCondition?.condition;

    if (!condition) return null;

    return WEATHER_RECOMMENDATIONS[condition] ?? {
        type: "general",
        label: "Weather",
        text: "Check local conditions and weather alerts before making outdoor plans."
    };
};