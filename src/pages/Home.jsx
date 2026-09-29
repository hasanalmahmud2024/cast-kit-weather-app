import { useState } from "react";
import { Search } from "lucide-react";
import LocationModal from "../components/LocationModal";
import Logo from "../components/Logo";

const Home = () => {
    const [click, setClick] = useState(false);

    return (
        <>
            <div className="text-center max-w-lg mx-auto p-6 space-y-6">
                <div className="inline-flex items-center justify-center rounded-full text-blue-500">
                    <Logo/>
                </div>

                <div className="space-y-2">
                    <h1 className="text-5xl md:text-6xl font-bold text-blue-500 tracking-tight">
                        CastKit <span className="text-blue-400">Weather</span>
                    </h1>
                    <p className="text-lg text-gray-500 font-medium">
                        Real-time forecasts & live conditions for any location
                    </p>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={() => setClick(true)}
                        className="inline-flex items-center gap-2 rounded-4xl bg-blue-500 px-6 py-3 text-lg font-medium text-white shadow-md hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                        <Search size={20} />
                        <span>Check Weather</span>
                    </button>
                </div>
            </div>

            {click && <LocationModal onClose={() => setClick(false)} />}
        </>
    );
};

export default Home;