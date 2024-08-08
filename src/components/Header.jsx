// src/components/Header.jsx
import { Link } from "react-router-dom";

const Header = ({ currentUser, handleSignOut }) => {
  return (
    <header className="p-4 mb-4 border-b flex justify-between items-center">
      <Link to={`/`} className="hover:underline text-2xl">
        NC News
      </Link>
      <nav>
        <Link to="/articles" className="mr-4 hover:underline">
          Articles
        </Link>
        <Link to="/topics" className="mr-4 hover:underline">
          Topics
        </Link>
      </nav>
      {currentUser ? (
        currentUser === "guest" ? (
          <button
            onClick={handleSignOut}
            className="ml-4 text-gray-600 hover:underline"
          >
            You are currently signed in as a guest
          </button>
        ) : (
          <div>
            <span>Welcome, {currentUser}!</span>
            <button
              onClick={handleSignOut}
              className="ml-4 text-blue-500 hover:underline"
            >
              Sign Out
            </button>
          </div>
        )
      ) : (
        <Link to="/signin" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;
