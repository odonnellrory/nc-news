import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../../utils/api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import LoadingDisplay from "../minor/LoadingDisplay";
import ErrorDisplay from "../minor/ErrorDisplay";
import { Link } from "react-router-dom";

// CommentSection Component
// Renders all of the comments for a specific article_id

const CommentSection = ({ article_id, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByArticleId(article_id);
        setComments(data);
        setIsLoading(false);
      } catch (err) {
        setError(
          "There was an error fetching the comments.  Please try again."
        );
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [article_id]);

  const addComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  if (isLoading) return <LoadingDisplay />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <section className="mt-8">
      {currentUser && currentUser !== "guest" ? (
        <CommentForm
          article_id={article_id}
          addComment={addComment}
          currentUser={currentUser}
        />
      ) : (
        <p className="text-center p-4">
          You need to be{" "}
          <Link to="/signin" className="font-bold hover:underline">
            signed in
          </Link>{" "}
          to post a comment.
        </p>
      )}{" "}
      <CommentList comments={comments} currentUser={currentUser} />
    </section>
  );
};

export default CommentSection;
