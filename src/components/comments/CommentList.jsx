import CommentCard from "./CommentCard";

const CommentList = ({ comments, users, currentUser, onCommentDeleted }) => {
  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          user={users.find((user) => user.username === comment.author)}
          currentUser={currentUser}
          onCommentDeleted={onCommentDeleted}
        />
      ))}
    </ul>
  );
};

export default CommentList;
