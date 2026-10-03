import { motion } from "framer-motion";

const WeatherParticles = ({ weather }) => {
    const condition = `${weather?.condition} ${weather?.description}`.toLowerCase();
    const isDay = weather?.isDay;

    // Rain / Drizzle Particle Layer
    if (condition.includes("rain") || condition.includes("drizzle")) {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`rain-${i}`}
                        initial={{ y: -20, x: `${(i * 5) % 100}%`, opacity: 0.2 }}
                        animate={{ y: ["0vh", "100vh"], opacity: [0.3, 0.7, 0.3] }}
                        transition={{
                            duration: 1 + (i % 3) * 0.4,
                            repeat: Infinity,
                            ease: "linear",
                            delay: (i % 5) * 0.2,
                        }}
                        className="absolute w-0.5 h-6 bg-cyan-300/40 rounded-full blur-[0.5px]"
                    />
                ))}
            </div>
        );
    }

    // Snow Particle Layer
    if (condition.includes("snow")) {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={`snow-${i}`}
                        initial={{ y: -10, x: `${(i * 4) % 100}%`, opacity: 0.3 }}
                        animate={{
                            y: ["0vh", "100vh"],
                            x: [`${(i * 4) % 100}%`, `${((i * 4) % 100) + (i % 2 === 0 ? 5 : -5)}%`],
                            opacity: [0.4, 0.9, 0.4],
                        }}
                        transition={{
                            duration: 4 + (i % 4),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: (i % 6) * 0.3,
                        }}
                        className="absolute w-2 h-2 bg-sky-200/60 rounded-full blur-[0.5px]"
                    />
                ))}
            </div>
        );
    }

    // Thunderstorm Lightning Glow Layer
    if (condition.includes("thunderstorm") || condition.includes("storm")) {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ opacity: [0, 0, 0.25, 0, 0.4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-purple-400/20 mix-blend-overlay"
                />
            </div>
        );
    }

    // Clear Day / Night Ambient Rays & Orbs
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.3, 0.15],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl ${isDay ? "bg-amber-300/30" : "bg-indigo-400/20"
                    }`}
            />
        </div>
    );
};

export default WeatherParticles;