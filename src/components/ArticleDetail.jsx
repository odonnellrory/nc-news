import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import LoadingDisplay from "./minor/LoadingDisplay";
import ErrorDisplay from "./minor/ErrorDisplay";

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(article_id);
        setArticle(data);
        setIsLoading(false);
      } catch (err) {
        setError("There was an error fetching the article. Please try again.");
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [article_id]);

  if (isLoading) return <LoadingDisplay />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <article className="max-w-2xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">{article.title}</h3>
      <div className="mb-4">
        <img
          src={article.article_img_url}
          alt={article.title}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="mb-4 text-sm">
        <p>
          Written by <span className="font-bold">{article.author}</span>
        </p>
        <p>Topic: {article.topic}</p>
        <p>Posted on:{new Date(article.created_at).toLocaleDateString()}</p>
        <p>Votes: {article.votes}</p>
      </div>
      <p className="mb-4">{article.body}</p>
      <div className="text-sm"></div>
      <p>Comments: {article.comment_count}</p>
    </article>
  );
};

export default ArticleDetail;
