import { useState } from "react";
import { patchArticleVotes } from "../../utils/api";
import ErrorDisplay from "../minor/ErrorDisplay";

const ArticleVote = ({ article_id, votes, setArticle }) => {
  const [voteChange, setVoteChange] = useState(0);
  const [error, setError] = useState(null);

  const handleVote = async (increment) => {
    setVoteChange((currentChange) => currentChange + increment);
    setError(null);

    try {
      const updatedArticle = await patchArticleVotes(article_id, increment);
      setArticle((article) => ({
        ...article,
        votes: updatedArticle.votes,
      }));
    } catch (err) {
      setVoteChange((currentChange) => currentChange - increment);
      setError("There was an error voting on this article.  Please try again.");
    }
  };

  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="flex items-center mt-2">
      <p>Votes: {votes}</p>
      <button
        onClick={() => handleVote(1)}
        className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
        disabled={voteChange === 1}
      >
        👍
      </button>
      <button
        onClick={() => handleVote(-1)}
        className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
        disabled={voteChange === -1}
      >
        👎
      </button>
    </div>
  );
};

export default ArticleVote;
