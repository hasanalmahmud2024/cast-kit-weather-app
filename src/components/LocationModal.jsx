import { LocateFixed, X } from "lucide-react";
import { useState } from "react";
import { getGeoLocation } from "../services/getGeoLocation";

// This modal lets the user choose a location by city name or by using the device's current coordinates.
const LocationModal = ({ onClose }) => {
    const [city, setCity] = useState("");

    // Submit the city name only after trimming extra whitespace.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const value = city.trim()

        // Ignore empty submissions before calling the geocoding API.
        if (!value) {
            console.warn("City field is empty.");
            return;
        }

        try {
            // Convert the city to latitude/longitude before requesting weather data.
            const result = await getGeoLocation(value);
            console.log("Location found : ", result); // {name: 'Dhaka', lat: 23.7104, long: 90.40744}

        } catch (error) {
            console.warn("Could not find weather data for that city.", error);
        }
    }


    // Allow users to skip typing by using their device's current location.
    // A timeout prevents the app from waiting indefinitely if location access is denied.
    const handleGeolocation = () => {
        if (!navigator.geolocation) {
            console.warn("Location access is denied.");
            return;
        }
        navigator.geolocation.getCurrentPosition((positions) => {
            const { latitude, longitude } = positions.coords;
            console.log(latitude, longitude)

        }, (error) => {
            console.warn("Geolocation failed:", error.message);
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
            </div>
        </div>)
}

export default LocationModal;