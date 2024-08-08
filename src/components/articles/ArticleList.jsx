import { useState, useEffect } from "react";
import { getArticles } from "../../utils/api";
import LoadingDisplay from "../minor/LoadingDisplay";
import ErrorDisplay from "../minor/ErrorDisplay";
import ArticleListItem from "./article-list/ArticleListItem";
import ArticleListSort from "./article-list/ArticleListSort";
import ArticleListPagination from "./article-list/ArticleListPagination";

// ArticleList Component
// Renders all articles found at /api/articles, with a limit of 10 per page.

const ArticleList = ({
  articles: propArticles,
  totalPages: propTotalPages,
  currentPage: propCurrentPage,
  sortBy: propSortBy,
  order: propOrder,
  setSearchParams: propSetSearchParams,
  topic,
}) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState(propSortBy || "created_at");
  const [order, setOrder] = useState(propOrder || "desc");
  const [currentPage, setCurrentPage] = useState(propCurrentPage || 1);

  useEffect(() => {
    if (propArticles) {
      setArticles(propArticles);
      setTotalPages(propTotalPages);
      setIsLoading(false);
    } else {
      const fetchArticles = async () => {
        setIsLoading(true);
        try {
          const data = await getArticles(currentPage, sortBy, order);
          setArticles(data.articles);
          setTotalPages(Math.ceil(data.total_count / 10));
          setIsLoading(false);
        } catch (err) {
          setError(
            "There was an error fetching the articles. Please try again."
          );
          setIsLoading(false);
        }
      };

      fetchArticles();
    }
  }, [currentPage, sortBy, order, propArticles, propTotalPages]);

  const updateSearchParams = (newParams) => {
    if (propSetSearchParams) {
      propSetSearchParams(newParams);
    }
  };

  if (isLoading) return <LoadingDisplay />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      <ArticleListSort
        sortBy={sortBy}
        order={order}
        onSortChange={(newSortBy) => {
          setSortBy(newSortBy);
          setCurrentPage(1);
          updateSearchParams({
            sort_by: newSortBy,
            order,
            p: 1,
            ...(topic ? { topic } : {}),
          });
        }}
        onOrderChange={() => {
          setOrder(order === "asc" ? "desc" : "asc");
          setCurrentPage(1);
          updateSearchParams({
            sort_by: sortBy,
            order: order === "asc" ? "desc" : "asc",
            p: 1,
            ...(topic ? { topic } : {}),
          });
        }}
      />
      <div className="grid gap-5">
        {articles.map((article) => (
          <ArticleListItem key={article.article_id} article={article} />
        ))}
      </div>
      <ArticleListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          updateSearchParams({
            sort_by: sortBy,
            order,
            p: page,
            ...(topic ? { topic } : {}),
          });
        }}
      />
    </div>
  );
};

export default ArticleList;
