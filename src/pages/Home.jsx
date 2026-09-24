import { useState } from "react";
import LocationModal from "../components/LocationModal";

const Home = () => {
    const [click, setClick] = useState(false);


    return (
        <>
            <div className="text-center">
                <h1 className="text-6xl font-bold text-blue-500">
                    CastKit <span className="text-blue-400">Weather</span>
                </h1>
                <p className="py-4 text-lg text-gray-500">
                    Check today's weather
                </p>
                <div>
                    <button
                        type="button"
                        onClick={() => setClick(true)}
                        className="rounded-4xl bg-blue-400 px-5 py-2 text-lg font-medium text-gray-700 transition-all delay-100 hover:scale-110"
                    >
                        Check Weather
                    </button>
                </div>
            </div>

            {
                click && <LocationModal onClose={()=>setClick(false)} />
            }
        </>
    )
}

export default Home;