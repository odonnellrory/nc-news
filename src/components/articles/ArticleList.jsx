import { useState, useEffect } from "react";
import { getArticles } from "../../utils/api";
import LoadingDisplay from "../minor/LoadingDisplay";
import ErrorDisplay from "../minor/ErrorDisplay";
import { Link } from "react-router-dom";

// ArticleList Component
// Renders all articles found at /api/articles, with a limit of 10 per page.

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles(currentPage);
        setArticles(data.articles);
        setTotalPages(Math.ceil(data.total_count / 10));
        setIsLoading(false);
      } catch (err) {
        setError(
          "There was an error fetching the articles.  Please try again."
        );
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  if (isLoading) return <LoadingDisplay />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="grid gap-5" aria-label="Articles">
      {articles.map((article) => (
        <div key={article.article_id} className="border p-4 rounded shadow">
          <article>
            <h4 className="text-xl font-bold mb-2">
              <Link
                to={`/articles/${article.article_id}`}
                className="hover:underline"
              >
                {article.title}
              </Link>
            </h4>
          </article>

          <div className="flex justify-between text-sm">
            <span className="font-bold">{article.author}</span>
            <span>Topic: {article.topic}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Comments: {article.comment_count}</span>
            <span>Votes: {article.votes}</span>
          </div>
        </div>
      ))}

      <div className="mt-4 flex justify-center" aria-label="Pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === page ? "bg-gray-200" : "bg-white-0"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
