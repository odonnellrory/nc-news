import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ArticleList from "./components/articles/ArticleList";
import ArticleDetail from "./components/articles/ArticleDetail";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<ArticleDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
