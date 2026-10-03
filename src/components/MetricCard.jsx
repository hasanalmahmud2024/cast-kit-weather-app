
const MetricCard = ({ icon: Icon, label, value, unit }) => (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
        <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
            <Icon size={18} className="text-blue-400" />
            <span className="text-sm font-medium text-gray-500">{label}</span>
        </div>
        <p className="text-2xl font-bold text-gray-700">
            {value ?? "--"}
            {unit && <span className="text-xs font-normal text-gray-500"> {unit}</span>}
        </p>
    </div>
);

export default MetricCard;
