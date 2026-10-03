
const RecommendationCard = ({weather, place, recommmendation}) => {
  return (
      <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 shadow-sm space-y-2">
          <h3 className="text-base font-bold text-blue-500">
              Live in {weather?.location || place?.name}
          </h3>
          <p className="text-gray-600 leading-relaxed font-medium">
              {recommmendation?.text}
          </p>
      </div>  )
}

export default RecommendationCard;