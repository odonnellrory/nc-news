import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../utils/api";
import LoadingDisplay from "../minor/LoadingDisplay";
import ErrorDisplay from "../minor/ErrorDisplay";
import CommentSection from "../comments/CommentSection";
import ArticleVote from "./ArticleVote";

// ArticleDetail Component
// This component renders all of the information for a specific article_id from the API

const ArticleDetail = ({ currentUser }) => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { article_id } = useParams();
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(article_id);
        setArticle(data);
        setIsLoading(false);
      } catch (err) {
        setError({
          status: err.status,
          message: "There was an error fetching the article. Please try again.",
        });
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [article_id]);

  if (isLoading) return <LoadingDisplay />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <article className="mb-8">
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
          <p>Posted on: {new Date(article.created_at).toLocaleDateString()}</p>

          <ArticleVote
            article_id={article_id}
            votes={article.votes}
            currentUser={currentUser}
          />
        </div>

        <p className="mb-4">{article.body}</p>
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Comments: {article.comment_count}
        </button>
      </article>
      {showComments && (
        <CommentSection article_id={article_id} currentUser={currentUser} />
      )}
    </div>
  );
};

export default ArticleDetail;
