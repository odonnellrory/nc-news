import { Link } from "react-router-dom";
import ArticleList from "./ArticleList";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Welcome</h1>
      <ArticleList />
    </div>
  );
};

export default Home;
