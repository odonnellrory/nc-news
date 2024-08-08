import { useParams, useSearchParams } from "react-router-dom";
import { getArticlesByTopic } from "../../utils/api";
import ArticleList from "../articles/ArticleList";
import LoadingDisplay from "../minor/LoadingDisplay";
import ErrorDisplay from "../minor/ErrorDisplay";
import { useEffect, useState } from "react";

// TopicPage Component
// This renders all of articles belonging to a specific topic onto the page.

const TopicPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("p")) || 1;
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(topic, currentPage, sortBy, order)
      .then((data) => {
        setArticles(data.articles);
        setTotalPages(Math.ceil(data.total_count / 10));
        setIsLoading(false);
      })
      .catch((err) => {
        setError(
          "There was an error fetching the articles for this topic. Please try again."
        );
        setIsLoading(false);
      });
  }, [topic, currentPage, sortBy, order]);

  if (isLoading) return <LoadingDisplay />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Articles on {topic}</h1>
      <ArticleList
        articles={articles}
        totalPages={totalPages}
        currentPage={currentPage}
        sortBy={sortBy}
        order={order}
        setSearchParams={setSearchParams}
        topic={topic}
      />
    </div>
  );
};

export default TopicPage;
