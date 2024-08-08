import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../../utils/api";
import LoadingDisplay from "../minor/LoadingDisplay";
import ErrorDisplay from "../minor/ErrorDisplay";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopics(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("There was an error fetching topics.  Please try again.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingDisplay />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Topics</h1>
      <ul className="space-y-2">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              to={`/topics/${topic.slug}`}
              className="text-blue-500 hover:underline"
            >
              {topic.slug}
            </Link>
            <p className="text-sm text-gray-600">{topic.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;
