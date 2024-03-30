const ProgressBar = ({ progressPercentage, colors=["bg-green-500", "bg-red-600"] }) => {
  return (
    <div className="h-3 overflow-hidden rounded-lg w-full bg-gray-300">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`h-full ${
          progressPercentage < 70 ?   colors[0] : colors[1]
        }`}
      ></div>
    </div>
  );
};

export default ProgressBar;
