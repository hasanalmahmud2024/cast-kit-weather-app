import { X } from "lucide-react";
import { useState } from "react";

const LocationModal = ({ onClose }) => {
    const [city, setCity] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = city.trim()
        console.log(value)
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/60">
            <div className="h-80 w-96 bg-gray-100 shadow-2xl rounded-3xl p-5">

                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium">Where are you today?</h2>
                    <button onClick={onClose} className="cursor-pointer rounded-full p-1 bg-gray-300">
                        <X />
                    </button>
                </div>

                <div className="pt-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            placeholder="Enter Your City"
                            className="px-3 py-1.5 border rounded-4xl w-full"
                            value={city}
                            onChange={(e)=>setCity(e.target.value)}
                        />
                        <div>
                            <button
                                type="submit"
                                className="rounded-4xl w-full bg-blue-500 px-5 py-2 text-md font-medium text-white transition-all delay-100 hover:scale-110"
                            >
                                Check Weather
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="text-center py-2">Or</div>

                <div>
                    <button
                        type="button"
                        className="rounded-4xl w-full bg-blue-500 px-5 py-2 text-md font-medium text-white transition-all delay-100 hover:scale-110"
                    >
                        Use My Location
                    </button>
                </div>
            </div>
        </div>)
}

export default LocationModal;