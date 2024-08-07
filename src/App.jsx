import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ArticleList from "./components/articles/ArticleList";
import ArticleDetail from "./components/articles/ArticleDetail";
import SignIn from "./components/users/SignIn";
import { useState, useEffect } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("currentUser") || "";
  });

  useEffect(() => {
    localStorage.setItem("currentUser", currentUser);
  }, [currentUser]);

  const handleSignOut = () => {
    setCurrentUser("");
    localStorage.removeItem("currentUser");
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          handleSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/signin"
            element={<SignIn setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/"
            element={currentUser ? <Home /> : <Navigate to="/signin" />}
          />
          <Route
            path="/articles"
            element={currentUser ? <ArticleList /> : <Navigate to="/signin" />}
          />
          <Route
            path="/articles/:article_id"
            element={
              currentUser ? (
                <ArticleDetail currentUser={currentUser} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
