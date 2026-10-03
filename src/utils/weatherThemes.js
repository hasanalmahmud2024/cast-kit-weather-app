// Dynamic theme configuration mapped directly to WMO condition keys from getWeather.js
export const getWeatherTheme = (condition = "", description = "") => {
    const c = (condition || "").toLowerCase();
    const d = (description || "").toLowerCase();
    const combined = `${c} ${d}`;

    // Rain, Drizzle, Rain Showers, Freezing Rain
    if (combined.includes("rain") || combined.includes("drizzle")) {
        return {
            pageBg: "bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-slate-100",
            cardBg: "bg-slate-800/80 backdrop-blur-md border-cyan-500/30 shadow-lg shadow-cyan-950/20",
            textColor: "text-cyan-400",
            titleColor: "text-white",
            badgeBg: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40",
            metricBg: "bg-slate-900/50 border-cyan-500/20",
            glowBg: "bg-cyan-500/20",
        };
    }

    // Snow or Snow Showers
    if (combined.includes("snow")) {
        return {
            pageBg: "bg-gradient-to-br from-slate-100 via-sky-100 to-indigo-100 text-slate-800",
            cardBg: "bg-white/80 backdrop-blur-md border-sky-300/60 shadow-lg shadow-sky-900/5",
            textColor: "text-sky-600",
            titleColor: "text-slate-900",
            badgeBg: "bg-sky-100 text-sky-800 border border-sky-300",
            metricBg: "bg-sky-50/70 border-sky-200/60",
            glowBg: "bg-sky-400/30",
        };
    }

    // Thunderstorms
    if (combined.includes("thunderstorm") || combined.includes("storm") || combined.includes("hail")) {
        return {
            pageBg: "bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-slate-100",
            cardBg: "bg-purple-900/40 backdrop-blur-md border-purple-500/30 shadow-lg shadow-purple-950/30",
            textColor: "text-purple-400",
            titleColor: "text-white",
            badgeBg: "bg-purple-500/20 text-purple-300 border border-purple-500/40",
            metricBg: "bg-slate-950/50 border-purple-500/20",
            glowBg: "bg-purple-500/25",
        };
    }

    // Fog / Mist / Rime Fog
    if (combined.includes("fog")) {
        return {
            pageBg: "bg-gradient-to-br from-slate-200 via-teal-100/50 to-zinc-300 text-slate-800",
            cardBg: "bg-white/80 backdrop-blur-md border-teal-300/50 shadow-lg shadow-teal-900/5",
            textColor: "text-teal-700",
            titleColor: "text-slate-900",
            badgeBg: "bg-teal-100 text-teal-800 border border-teal-300",
            metricBg: "bg-teal-50/60 border-teal-200/50",
            glowBg: "bg-teal-400/25",
        };
    }

    // Clouds, Overcast, Partly Cloudy
    if (combined.includes("cloud") || combined.includes("overcast")) {
        return {
            pageBg: "bg-gradient-to-br from-slate-200 via-blue-100/40 to-slate-300 text-slate-800",
            cardBg: "bg-white/80 backdrop-blur-md border-slate-300/70 shadow-lg shadow-slate-900/5",
            textColor: "text-slate-700",
            titleColor: "text-slate-900",
            badgeBg: "bg-slate-200 text-slate-800 border border-slate-300",
            metricBg: "bg-slate-100/80 border-slate-200",
            glowBg: "bg-slate-400/25",
        };
    }

    // Default: Clear / Sunny
    return {
        pageBg: "bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 text-slate-800",
        cardBg: "bg-white/80 backdrop-blur-md border-amber-200/80 shadow-lg shadow-amber-900/5",
        textColor: "text-amber-500",
        titleColor: "text-slate-900",
        badgeBg: "bg-amber-100 text-amber-800 border border-amber-300",
        metricBg: "bg-amber-50/60 border-amber-200/60",
        glowBg: "bg-amber-400/30",
    };
};