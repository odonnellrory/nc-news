import { useState, useEffect } from "react";
import { getArticles } from "../../utils/api";
import LoadingDisplay from "../minor/LoadingDisplay";
import ErrorDisplay from "../minor/ErrorDisplay";
import ArticleListItem from "./article-list/ArticleListItem";
import ArticleListSort from "./article-list/ArticleListSort";
import ArticleListPagination from "./article-list/ArticleListPagination";
import { useSearchParams } from "react-router-dom";

// TopicPage Component
// This renders all of articles belonging to a specific topic onto the page.

const ArticleList = ({ topic }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("p")) || 1;
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const data = await getArticles(currentPage, sortBy, order, topic);
        setArticles(data.articles);
        setTotalPages(Math.ceil(data.total_count / 10));
        setIsLoading(false);
      } catch (err) {
        setError({
          status: err.status,
          message:
            "There was an error fetching the articles. Please try again.",
        });
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, sortBy, order, topic]);

  const handleSortChange = (newSortBy) => {
    setSearchParams({
      sort_by: newSortBy,
      order,
      p: 1,
      ...(topic ? { topic } : {}),
    });
  };

  const handleOrderChange = () => {
    setSearchParams({
      sort_by: sortBy,
      order: order === "asc" ? "desc" : "asc",
      p: 1,
      ...(topic ? { topic } : {}),
    });
  };

  const handlePageChange = (page) => {
    setSearchParams({
      sort_by: sortBy,
      order,
      p: page,
      ...(topic ? { topic } : {}),
    });
  };

  if (isLoading) return <LoadingDisplay />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      <ArticleListSort
        sortBy={sortBy}
        order={order}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
      />
      <div className="grid gap-5">
        {articles.map((article) => (
          <ArticleListItem key={article.article_id} article={article} />
        ))}
      </div>
      <ArticleListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ArticleList;
