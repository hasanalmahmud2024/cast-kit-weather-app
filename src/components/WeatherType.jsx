import { motion, AnimatePresence } from "framer-motion";
import { WeatherVisual } from "../components/WeatherVisual";
import { Thermometer } from "lucide-react";

const WeatherType = ({weather}) => {
  return (
    <div>
          <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center min-h-90"
          >
              <AnimatePresence mode="wait">
                  <motion.div
                      key={weather?.description}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center text-center gap-5"
                  >
                      <WeatherVisual description={weather?.description} />

                      <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-500">
                              Current Condition
                          </p>
                          <h3 className="text-3xl font-bold text-blue-500 capitalize">
                              {weather?.description}
                          </h3>
                      </div>

                      <div className="rounded-4xl bg-blue-400 px-5 py-2 text-lg font-medium text-gray-700 flex items-center gap-2">
                          <Thermometer size={20} />
                          <span>Feels Like: {weather?.feelsLike}°C</span>
                      </div>
                  </motion.div>
              </AnimatePresence>
          </motion.div>
    </div>
  )
}

export default WeatherType;