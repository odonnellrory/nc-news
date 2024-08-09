import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../utils/api";
import SignInDisclaimer from "./SignInDisclaimer";
import LoadingDisplay from "../minor/LoadingDisplay";
import ErrorDisplay from "../minor/ErrorDisplay";

const SignIn = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const users = await getUsers();
      const user = users.find((u) => u.username === username);

      if (user && password === "password") {
        setCurrentUser(username);
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError({
        status: err.status,
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestAccess = () => {
    setCurrentUser("guest");
    navigate("/");
  };

  const handleUsernameClick = (clickedUsername) => {
    setUsername(clickedUsername);
    setPassword("password");
  };

  if (isLoading) return <LoadingDisplay />;

  return (
    <div className="container mx-auto mt-10 px-4 relative">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {error && <ErrorDisplay error={error} />}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Sign In
          </button>
        </form>
        <button
          onClick={handleGuestAccess}
          className="w-full p-2 mt-4 bg-gray-300 text-gray-700 rounded"
        >
          Continue as Guest
        </button>
      </div>
      <div className="absolute top-0 right-0 w-80 ml-4 hidden lg:block">
        <SignInDisclaimer onUsernameClick={handleUsernameClick} />
      </div>
      <div className="mt-8 lg:hidden">
        <SignInDisclaimer onUsernameClick={handleUsernameClick} />
      </div>
    </div>
  );
};

export default SignIn;
