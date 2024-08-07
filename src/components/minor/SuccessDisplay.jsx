const SuccessDisplay = ({ message = "Operation successful!" }) => {
  return (
    <div className="p-2">
      <p className="text-green-500">{message}</p>
    </div>
  );
};

export default SuccessDisplay;
