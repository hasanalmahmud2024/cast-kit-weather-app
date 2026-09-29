import { AlertCircle, ArrowLeft, MapPinOff, Route } from "lucide-react";
import { useNavigate } from "react-router";

const errorTypes = {
    error: {
        title: "Something Went Wrong",
        icon: AlertCircle,
        buttonLabel: "Go Back Home",
    },
    "no-location": {
        title: "No Location Selected",
        icon: MapPinOff,
        buttonLabel: "Select a Location",
    },
    route: {
        title: "Page Could Not Be Loaded",
        icon: Route,
        buttonLabel: "Go Back Home",
    },
};

const ErrorState = ({ type = "error", message }) => {
    const navigate = useNavigate();
    const config = errorTypes[type] ?? errorTypes.error;
    const Icon = config.icon;

    return (
        <div className="mx-auto flex min-h-87.5 max-w-md flex-col items-center justify-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-blue-50 p-4 text-blue-500">
                <Icon size={48} aria-hidden="true" />
            </div>

            <h2 className="text-2xl font-bold text-blue-500">
                {config.title}
            </h2>

            <p className="font-medium text-gray-500">
                {message || "Please try again later."}
            </p>

            <button
                type="button"
                onClick={() => navigate("/")}
                className="flex cursor-pointer items-center gap-2 rounded-4xl bg-blue-400 px-5 py-2 text-lg font-medium text-gray-700 transition hover:scale-105"
            >
                <ArrowLeft size={20} aria-hidden="true" />
                <span>{config.buttonLabel}</span>
            </button>
        </div>
    );
};

export default ErrorState;