/**
 * Dynamic Weather Recommendation Engine
 * Evaluates real-time metrics (temperature, wind speed, humidity, precipitation, day/night)
 * to provide context-aware activity and gear recommendations.
 */

export const getWeatherRecommendation = (weather) => {
    if (!weather) return null;

    const {
        condition = "",
        description = "",
        temperature = 20,
        feelsLike = 20,
        windSpeed = 0,
        humidity = 50,
        precipitation = 0,
        isDay = true,
    } = weather;

    const c = `${condition} ${description}`.toLowerCase();

    // Recommendation state containers
    let level = "info"; // "info" | "warning" | "alert"
    let actionBadge = "General Advisory";
    let mainText = "";
    let outfitAdvice = "";
    let activityAdvice = "";

    // 1. Severe Weather Rules (Thunderstorms, Heavy Rain, Snow, Freezing Rain)
    if (c.includes("thunderstorm") || c.includes("storm") || c.includes("hail")) {
        level = "alert";
        actionBadge = "Stay Indoors";
        mainText = "Thunderstorms and severe lightning reported in your area.";
        outfitAdvice = "Heavy rain gear if travel is essential.";
        activityAdvice = "Avoid open areas, electrical appliances, and outdoor plans.";
    } else if (c.includes("freezing") || c.includes("snow")) {
        level = "warning";
        actionBadge = "Ice & Winter Advisory";
        mainText = "Sub-zero or freezing conditions may lead to slippery surfaces.";
        outfitAdvice = "Thermal layers, insulated coat, gloves, and anti-slip footwear.";
        activityAdvice = "Allow extra travel time and exercise caution on roads.";
    } else if (precipitation > 2 || c.includes("rain") || c.includes("drizzle")) {
        level = "warning";
        actionBadge = "Rain Protection Required";
        mainText = precipitation > 5
            ? "Heavy rainfall observed. Low visibility and localized puddles likely."
            : "Light to moderate rain showers in effect.";
        outfitAdvice = "Waterproof jacket, boots, or an umbrella.";
        activityAdvice = "Great time for indoor venues, cafes, or cozy indoor activities.";
    }

    // 2. Temperature & Heat/Cold Threshold Rules (if no severe precipitation)
    else if (temperature >= 32 || feelsLike >= 35) {
        level = "warning";
        actionBadge = "High Heat Notice";
        mainText = "High temperatures detected. Stay hydrated and limit heat exertion.";
        outfitAdvice = "Lightweight, breathable cotton clothing and sunglasses.";
        activityAdvice = "Schedule outdoor tasks for early morning or after sunset.";
    } else if (temperature <= 5 || feelsLike <= 2) {
        level = "warning";
        actionBadge = "Cold Weather Alert";
        mainText = "Cool temperatures require extra thermal insulation.";
        outfitAdvice = "Heavy winter coat, scarf, beanie, and warm socks.";
        activityAdvice = "Limit prolonged skin exposure to cold wind gusts.";
    }

    // 3. Moderate / Pleasant Weather Rules
    else if (c.includes("clear") || c.includes("sunny")) {
        if (isDay) {
            level = "info";
            actionBadge = "Ideal Outdoor Weather";
            mainText = "Clear skies and comfortable conditions outside.";
            outfitAdvice = "Casual wear with UV sun protection (sunscreen/sunglasses).";
            activityAdvice = "Perfect for outdoor sports, walking, or a park picnic.";
        } else {
            level = "info";
            actionBadge = "Clear Stargazing Night";
            mainText = "Clear nighttime sky with calm atmospheric conditions.";
            outfitAdvice = "A light sweater or jacket for cool evening breezes.";
            activityAdvice = "Great night for a quiet stroll or stargazing.";
        }
    } else if (c.includes("cloud") || c.includes("overcast") || c.includes("fog")) {
        level = "info";
        actionBadge = "Overcast Conditions";
        mainText = c.includes("fog")
            ? "Reduced atmospheric visibility due to mist or fog."
            : "Cloudy skies keeping temperatures moderate.";
        outfitAdvice = "A comfortable windbreaker or light layer.";
        activityAdvice = c.includes("fog")
            ? "Use fog lights while driving and stay alert."
            : "Good conditions for outdoor jogging or errands.";
    }

    // 4. Wind Modifier Add-on
    if (windSpeed > 30) {
        mainText += ` Note: Strong wind gusts up to ${windSpeed} km/h recorded.`;
    }

    return {
        level,
        actionBadge,
        text: mainText,
        outfitAdvice,
        activityAdvice,
    };
};