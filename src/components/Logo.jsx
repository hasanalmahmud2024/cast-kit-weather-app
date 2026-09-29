import { motion } from "framer-motion";
import { Sun, Cloud } from "lucide-react";

const Logo = () => {
    return (
        <div className="relative flex items-center justify-center w-16 h-16 bg-linear-to-br from-sky-400 to-blue-600 rounded-full">
            {/* Rotating Sun */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute z-0 text-yellow-300"
            >
                <Sun size={36} className="fill-yellow-300"/>
            </motion.div>

            {/* Smaller drifting cloud */}
            <motion.div
                animate={{ x: [-2, 2, -2], y: [3, 0, 3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-10 translate-x-3 -translate-y-3 text-white drop-shadow-sm"
            >
                <Cloud size={20} className="fill-white stroke-sky-100" />
            </motion.div>

            {/* Main floating cloud */}
            <motion.div
                animate={{ y: [-2, 2, -2], rotate: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20 -translate-x-2 translate-y-2 text-white drop-shadow-md"
            >
                <Cloud size={30} className="fill-white stroke-sky-100" />
            </motion.div>
        </div>
    );
};

export default Logo;