import { motion } from "framer-motion";

export const WeatherVisual = ({ description, isDay = true }) => {
    const desc = description?.toLowerCase() || "";

    // 1. Rain / Drizzle Animated SVG
    if (desc.includes("rain") || desc.includes("drizzle")) {
        return (
            <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16">
                {/* Ambient Radial Glow */}
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

                {/* Animated Rain Cloud SVG */}
                <motion.svg
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-xl text-cyan-400"
                >
                    <path
                        fill="currentColor"
                        fillOpacity="0.25"
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M25 60 a18 18 0 0 1 0 -36 a22 22 0 0 1 40 -6 a16 16 0 0 1 20 16 a18 18 0 0 1 -10 26 z"
                    />
                    {/* Falling Raindrops */}
                    {[28, 44, 60, 72].map((x, i) => (
                        <motion.line
                            key={`drop-${i}`}
                            x1={x}
                            y1="66"
                            x2={x - 4}
                            y2="82"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            animate={{ y1: [64, 76, 64], y2: [80, 92, 80], opacity: [0.3, 1, 0.3] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.25,
                            }}
                        />
                    ))}
                </motion.svg>
            </div>
        );
    }

    // 2. Snow Animated SVG
    if (desc.includes("snow")) {
        return (
            <div className="relative flex items-center justify-center w-36 h-36 md:w-44 md:h-44">
                <div className="absolute inset-0 bg-sky-300/20 rounded-full blur-2xl pointer-events-none" />

                <motion.svg
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-xl text-sky-400"
                >
                    <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <line x1="50" y1="15" x2="50" y2="85" />
                        <line x1="15" y1="50" x2="85" y2="50" />
                        <line x1="25" y1="25" x2="75" y2="75" />
                        <line x1="25" y1="75" x2="75" y2="25" />
                    </g>
                </motion.svg>
            </div>
        );
    }

    // 3. Thunderstorm Animated SVG
    if (desc.includes("thunder") || desc.includes("storm")) {
        return (
            <div className="relative flex items-center justify-center w-36 h-36 md:w-44 md:h-44">
                <div className="absolute inset-0 bg-purple-500/25 rounded-full blur-2xl pointer-events-none" />

                <motion.svg
                    animate={{ scale: [0.96, 1.04, 0.96] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-2xl text-purple-400"
                >
                    {/* Cloud */}
                    <path
                        fill="currentColor"
                        fillOpacity="0.25"
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M25 50 a16 16 0 0 1 0 -32 a20 20 0 0 1 36 -6 a14 14 0 0 1 18 14 a16 16 0 0 1 -8 24 z"
                    />
                    {/* Flashing Lightning Bolt */}
                    <motion.polygon
                        points="52,48 40,68 50,68 44,90 62,62 52,62"
                        fill="currentColor"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.1, 0.95] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.svg>
            </div>
        );
    }

    // 4. Overcast / Cloudy Animated SVG
    if (desc.includes("cloud") || desc.includes("overcast") || desc.includes("fog")) {
        return (
            <div className="relative flex items-center justify-center w-36 h-36 md:w-44 md:h-44">
                <div className="absolute inset-0 bg-slate-300/20 rounded-full blur-2xl pointer-events-none" />

                <motion.svg
                    animate={{ x: [-8, 8, -8] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-lg text-slate-300"
                >
                    <path
                        fill="currentColor"
                        fillOpacity="0.3"
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M20 65 a18 18 0 0 1 0 -36 a22 22 0 0 1 42 -6 a16 16 0 0 1 20 16 a18 18 0 0 1 -10 26 z"
                    />
                </motion.svg>
            </div>
        );
    }

    // 5. Clear Night Animated SVG
    if (!isDay) {
        return (
            <div className="relative flex items-center justify-center w-36 h-36 md:w-44 md:h-44">
                <div className="absolute inset-0 bg-indigo-500/25 rounded-full blur-2xl pointer-events-none" />

                <motion.svg
                    animate={{ rotate: [-6, 6, -6], scale: [0.98, 1.03, 0.98] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-2xl text-indigo-300"
                >
                    <path
                        fill="currentColor"
                        fillOpacity="0.3"
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M50 15 A35 35 0 1 0 85 50 A28 28 0 0 1 50 15 Z"
                    />
                </motion.svg>
            </div>
        );
    }

    // 6. Clear Sunny Day Animated SVG
    return (
        <div className="relative flex items-center justify-center w-36 h-36 md:w-44 md:h-44">
            <div className="absolute inset-0 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />

            <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-2xl text-amber-400"
            >
                {/* Rotating Sun Rays */}
                <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                        const rad = (angle * Math.PI) / 180;
                        const x1 = 50 + 32 * Math.cos(rad);
                        const y1 = 50 + 32 * Math.sin(rad);
                        const x2 = 50 + 42 * Math.cos(rad);
                        const y2 = 50 + 42 * Math.sin(rad);
                        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} />;
                    })}
                </g>
                {/* Center Sun Disc */}
                <circle cx="50" cy="50" r="22" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
            </motion.svg>
        </div>
    );
};