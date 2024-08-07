import { useState } from "react";
import { postComment } from "../../utils/api";
import SuccessDisplay from "../minor/SuccessDisplay";
import ErrorDisplay from "../minor/ErrorDisplay";

const CommentForm = ({ article_id, addComment }) => {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body) {
      setError("Comment cannot be empty");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const newComment = await postComment(article_id, "jessjelly", body);
      addComment(newComment);
      setBody("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("There was an error posting the comment.  Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your comment here..."
        className="w-full p-2 border rounded"
        rows="3"
        disabled={isSubmitting}
      />
      {error && <ErrorDisplay error={error} />}
      {success && <SuccessDisplay message="Comment posted successfully!" />}
      <button
        type="submit"
        className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
