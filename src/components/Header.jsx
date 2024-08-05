import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 mb-4 border-b">
      <Link to={`/`} className="hover:underline text-2xl mb-2">
        NC News
      </Link>{" "}
    </header>
  );
};

export default Header;
