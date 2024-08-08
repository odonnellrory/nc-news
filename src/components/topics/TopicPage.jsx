import { useParams } from "react-router-dom";
import { getArticlesByTopic } from "../../utils/api";
import ArticleList from "../articles/ArticleList";
import LoadingDisplay from "../minor/LoadingDisplay";
import ErrorDisplay from "../minor/ErrorDisplay";
import { useEffect, useState } from "react";

const TopicPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(topic)
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(
          "There was an error fetching the articles for this topic.  Please try again."
        );
        setIsLoading(false);
      });
  }, [topic]);

  if (isLoading) return <LoadingDisplay />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Articles on {topic}</h1>
      <ArticleList articles={articles} />
    </div>
  );
};

export default TopicPage;
