// Dynamic theme configuration
export const getWeatherTheme = (condition = "", description = "", isDay = true) => {
    const combined = `${condition} ${description}`.toLowerCase();

    // Clear Night Theme
    if (!isDay && (combined.includes("clear") || combined.includes("sunny"))) {
        return {
            pageBg: "bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-slate-100",
            cardBg: "bg-indigo-950/40 backdrop-blur-md border-indigo-500/30 shadow-lg shadow-indigo-950/40",
            textColor: "text-indigo-300",
            titleColor: "text-white",
            badgeBg: "bg-indigo-500/20 text-indigo-200 border border-indigo-500/30",
            metricBg: "bg-slate-900/60 border-indigo-500/20",
            glowBg: "bg-indigo-500/20",
        };
    }

    // Rain / Drizzle / Showers Theme
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

    // Snow Theme
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

    // Thunderstorm Theme
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

    // Clouds / Overcast Theme
    if (combined.includes("cloud") || combined.includes("overcast") || combined.includes("fog")) {
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

    // Default Clear Sunny Day Theme
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