import { Link } from "react-router-dom";

const ArticleListItem = ({ article }) => (
  <div className="border p-4 rounded shadow min-h-[120px] relative">
    <article>
      <h4 className="text-xl font-bold mb-2">
        <Link
          to={`/articles/${article.article_id}`}
          className="hover:underline"
        >
          {article.title}
        </Link>
      </h4>
    </article>
    <div className="absolute top-4 right-6 text-sm text-gray-700 italic">
      Topic: {article.topic}
    </div>
    <div className="absolute bottom-4 left-6 flex space-x-4 text-sm text-gray-600">
      <span>Comments: {article.comment_count}</span>
      <span>Votes: {article.votes}</span>
    </div>
    <div className="absolute bottom-4 right-6 text-xs text-gray-500">
      Posted on: {new Date(article.created_at).toLocaleDateString()}
    </div>
  </div>
);

export default ArticleListItem;
