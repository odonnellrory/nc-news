const CommentCard = ({ comment }) => {
  return (
    <li className="border p-4 rounded shadow">
      <p className="mb-2">{comment.body}</p>
      <div className="text-sm text-gray-600">
        <span>Written by {comment.author}</span>
        <span className="ml-4">
          Posted on {new Date(comment.created_at).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm mt-2">Votes: {comment.votes}</p>
    </li>
  );
};

export default CommentCard;
