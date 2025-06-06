const SlangCard = ({ term, meaning, example, onClick }) => {
  return (
    <div className="flex flex-col items-center group transition-all duration-200 hover:scale-105">
      <div
        onClick={onClick}
        className="w-full px-8 py-16 bg-white rounded-2xl mb-4 shadow-sm border border-gray-200 group-hover:shadow-md group-hover:border-purple-200 transition-all flex justify-center items-center cursor-pointer"
      >
        <h1 className="text-center font-bold text-3xl">{term}</h1>
      </div>
      <div className="space-y-2 w-full p-4">
        <p className="text-gray-700 font-medium">{meaning}</p>
        <p className="text-gray-500 text-sm italic mb-3">
          <span>e.g.</span>"{example}"
        </p>
      </div>
    </div>
  )
}

export default SlangCard
