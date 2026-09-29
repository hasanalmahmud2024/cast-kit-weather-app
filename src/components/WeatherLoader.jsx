import { motion } from "framer-motion";
import { Sun, Cloud } from "lucide-react";

const WeatherLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-100 gap-4">
            <div className="relative flex items-center justify-center w-24 h-24">
                {/* Rotating Sun */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute text-blue-400"
                >
                    <Sun size={64} />
                </motion.div>

                {/* Floating Cloud */}
                <motion.div
                    animate={{ x: [-8, 8, -8], y: [-2, 2, -2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute text-blue-500 translate-x-2 translate-y-2"
                >
                    <Cloud size={52} className="fill-blue-500/20" />
                </motion.div>
            </div>

            <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-lg font-medium text-gray-500"
            >
                Fetching weather report...
            </motion.p>
        </div>
    );
};

export default WeatherLoader;