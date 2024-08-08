import { useState } from "react";
import { deleteComment } from "../../utils/api";
import ErrorDisplay from "../minor/ErrorDisplay";

const CommentCard = ({ comment, user, currentUser, onCommentDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setError(null);

    try {
      await deleteComment(comment.comment_id);
      onCommentDeleted(comment.comment_id);
    } catch (err) {
      setError("There was an error deleting the comment.  Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <li className="border p-4 rounded shadow relative min-h-[120px]">
      <div className="flex items-start mb-2">
        <img
          src={user?.avatar_url}
          alt={`${comment.author}'s avatar`}
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="font-bold">{comment.author}</span>
      </div>

      <p className="mb-4">{comment.body}</p>

      <div className="absolute bottom-2 left-4 text-sm text-gray-600">
        Votes: {comment.votes}
      </div>

      <div className="absolute top-2 right-2 text-sm text-gray-600">
        Posted on {new Date(comment.created_at).toLocaleDateString()}
      </div>

      {currentUser === comment.author && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`absolute bottom-2 right-4 text-red-500 hover:text-red-700 ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}

      {error && <ErrorDisplay error={error} />}
    </li>
  );
};

export default CommentCard;
