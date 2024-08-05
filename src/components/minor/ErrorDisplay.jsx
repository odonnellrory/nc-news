const Error = ({ error }) => {
  let errorMessage = "An error occurred";

  if (typeof error === "string") {
    errorMessage = error;
  } else if (error && error.message) {
    errorMessage = error.message;
  } else if (error && error.error) {
    errorMessage = error.error;
  }

  return (
    <div className="p-4">
      <p className="text-red-600">Error: {errorMessage}</p>
      {error && error.status && (
        <p className="text-sm">Status: {error.status}</p>
      )}
    </div>
  );
};

export default Error;
