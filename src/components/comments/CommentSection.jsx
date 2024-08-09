import { useState, useEffect } from "react";
import { getCommentsByArticleId, getUsers } from "../../utils/api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import LoadingDisplay from "../minor/LoadingDisplay";
import ErrorDisplay from "../minor/ErrorDisplay";
import { Link } from "react-router-dom";

// CommentSection Component
// Renders all of the comments for a specific article_id

const CommentSection = ({ article_id, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const [commentsData, usersData] = await Promise.all([
          getCommentsByArticleId(article_id),
          getUsers(),
        ]);
        setComments(commentsData);
        setUsers(usersData);
        setIsLoading(false);
      } catch (err) {
        setError({
          status: err.status,
          message:
            "There was an error fetching the comments. Please try again.",
        });
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [article_id]);

  const addComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const handleCommentDeleted = (deletedCommentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== deletedCommentId)
    );
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
      <CommentList
        comments={comments}
        users={users}
        currentUser={currentUser}
        onCommentDeleted={handleCommentDeleted}
      />
    </section>
  );
};

export default CommentSection;
