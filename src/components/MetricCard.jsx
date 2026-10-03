// Renders individual weather metric stats with metric background support
const MetricCard = ({ icon: Icon, label, value, unit, metricBg, textColor }) => (
    <div className={`rounded-2xl border p-4 text-center transition-all ${metricBg || "bg-gray-50 border-gray-100"}`}>
        <div className="flex items-center justify-center gap-1 mb-1">
            <Icon size={18} className={textColor || "text-blue-400"} />
            <span className="text-sm font-medium text-gray-500">{label}</span>
        </div>
        <p className={`text-2xl font-bold ${textColor}`}>
            {value ?? "--"}
            {unit && <span className="text-xs font-normal text-gray-500"> {unit}</span>}
        </p>
    </div>
);

export default MetricCard;