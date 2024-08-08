const ArticleListSort = ({ sortBy, order, onSortChange, onOrderChange }) => (
  <div className="mb-4">
    <label className="mr-2">Sort by:</label>
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
      className="mr-4 p-1 border rounded"
    >
      <option value="created_at">Date</option>
      <option value="comment_count">Comment Count</option>
      <option value="votes">Votes</option>
    </select>
    <button onClick={onOrderChange} className="p-1 border rounded">
      {order === "asc" ? "Ascending" : "Descending"}
    </button>
  </div>
);

export default ArticleListSort;
