import { ArrowLeft, CloudSun, Gauge, Sparkles, Wind, Layers } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Logo from "../components/Logo";

// Key features highlight list
const FEATURES = [
  {
    icon: CloudSun,
    title: "Dynamic Weather Themes",
    description: "Adaptive backgrounds, gradients, and particle effects that automatically react to daytime, night, rain, or snow.",
  },
  {
    icon: Gauge,
    title: "Atmospheric Metrics",
    description: "Detailed breakdown of humidity, wind speed, pressure, precipitation, and direction powered by Open-Meteo.",
  },
  {
    icon: Sparkles,
    title: "Smart Live Recommendations",
    description: "Contextual outfit and activity advice evaluated from real-time temperature, wind, and severe weather indicators.",
  },
];

// Tech stack badges
const TECH_STACK = [
  "React 19",
  "Tailwind CSS v4",
  "Framer Motion",
  "Lucide Icons",
  "React Router v7",
  "Open-Meteo API",
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-3xl mx-auto space-y-8 p-6"
      >
        {/* Back Button & Logo Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:shadow-xs cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>Back Home</span>
          </button>

          <div className="scale-75">
            <Logo />
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold tracking-wide">
            <Layers size={14} />
            <span>About CastKit Weather</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Real-Time Forecasting, <span className="text-blue-500">Elevated</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
            CastKit Weather is a lightweight, modern weather dashboard built to deliver accurate live weather conditions, atmospheric insights, and condition-aware recommendations in a visually dynamic interface.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-5 shadow-xs space-y-3 hover:shadow-md transition"
              >
                <div className="inline-flex p-3 rounded-2xl bg-sky-50 text-sky-600">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Badges */}
        <div className="bg-white/60 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 text-center space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 block">
            Built with modern web tools
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;