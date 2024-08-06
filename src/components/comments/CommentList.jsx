import CommentCard from "./CommentCard";

const CommentList = ({ comments }) => {
  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentList;
