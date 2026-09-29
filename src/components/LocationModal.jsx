import { LocateFixed, X } from "lucide-react";
import { useState } from "react";
import { getGeoLocation } from "../services/getGeoLocation";
import { useNavigate } from "react-router";

// This modal lets the user choose a location by city name or by using the device's current coordinates.
// @ts-ignore
const LocationModal = ({ onClose }) => {
    const navigate = useNavigate();
    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const goToPage = (location) => {
        navigate("/weather", { state: { location } })
    }

    // Submit the city name only after trimming extra whitespace.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const value = city.trim()

        // Ignore empty submissions before calling the geocoding API.
        if (!value) {
            setError("City field is empty.");
            return;
        }

        try {
            // Convert the city to latitude/longitude before requesting weather data.
            const location = await getGeoLocation(value);
            // console.log("Location found : ", result); // {name: 'Dhaka', lat: 23.7104, long: 90.40744}
            if (!location) {
                setError("GeoCoding Request Failed!")
            } else {
                goToPage(location)
            }

        } catch (error) {
            console.warn("Could not find weather data for that city.", error);
            setError(error instanceof Error ? error.message : "Could not find that city.");
        }
    }


    // Allow users to request device's current location and stop waiting if the response takes too long.
    const handleGeolocation = () => {
        if (!navigator.geolocation) {
            setError("The browser does not support geolocation.");
            return;
        }
        navigator.geolocation.getCurrentPosition((positions) => {
            const { latitude, longitude } = positions.coords;
            // console.log(latitude, longitude)
            goToPage({ name: 'Your Location', lat: latitude, long: longitude })

        }, (error) => {
            // console.warn("Geolocation failed:", error.message);
            setError(error.message || "Could not get your location.");
        }, {
            timeout: 10000
        })
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
                            onChange={(e) => setCity(e.target.value)}
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
                        onClick={handleGeolocation}
                        className="rounded-4xl w-full text-blue-500 border-2 border-blue-500 px-5 py-2 text-md font-medium bg-white transition-all delay-100 hover:scale-110"
                    >
                        <div className="flex justify-center gap-3">
                            <LocateFixed /> <span>Use My Location</span>
                        </div>
                    </button>
                </div>

                <div className="text-center">
                    {error && <p className="text-md text-red-600 font-medium pt-2">{error}</p>}
                </div>
            </div>
        </div>)
}

export default LocationModal;