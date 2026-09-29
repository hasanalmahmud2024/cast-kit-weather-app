import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, Snowflake, CloudLightning } from "lucide-react";

export const WeatherVisual = ({ description }) => {
    const desc = description?.toLowerCase() || "";

    if (desc.includes("rain") || desc.includes("drizzle")) {
        return (
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="p-6 bg-blue-100/80 rounded-full text-blue-600"
            >
                <CloudRain size={80} />
            </motion.div>
        );
    }

    if (desc.includes("snow")) {
        return (
            <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="p-6 bg-sky-100/80 rounded-full text-sky-500"
            >
                <Snowflake size={80} />
            </motion.div>
        );
    }

    if (desc.includes("thunder") || desc.includes("storm")) {
        return (
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="p-6 bg-purple-100/80 rounded-full text-purple-600"
            >
                <CloudLightning size={80} />
            </motion.div>
        );
    }

    if (desc.includes("cloud") || desc.includes("overcast")) {
        return (
            <motion.div
                animate={{ x: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="p-6 bg-slate-100/80 rounded-full text-slate-500"
            >
                <Cloud size={80} />
            </motion.div>
        );
    }

    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-6 bg-amber-100/80 rounded-full text-amber-500"
        >
            <Sun size={80} />
        </motion.div>
    );
};