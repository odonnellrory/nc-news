import { useState } from "react";
import { patchArticleVotes } from "../../utils/api";
import ErrorDisplay from "../minor/ErrorDisplay";

// ArticleVote Component
// This component handles the voting functionality on articles.

const ArticleVote = ({ article_id, votes: initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [error, setError] = useState(null);

  const handleVote = async (increment) => {
    setVotes((currentVotes) => currentVotes + increment);
    setError(null);

    patchArticleVotes(article_id, increment).catch((err) => {
      setVoteChange((currentChange) => currentChange - increment);
      setError("There was an error voting on this article. Please try again.");
    });
  };

  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="flex items-center mt-2">
      <p>Votes: {votes}</p>
      <button
        onClick={() => handleVote(1)}
        className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
        disabled={votes === initialVotes + 1}
      >
        👍
      </button>
      <button
        onClick={() => handleVote(-1)}
        className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
        disabled={votes === initialVotes - 1}
      >
        👎
      </button>
    </div>
  );
};

export default ArticleVote;
