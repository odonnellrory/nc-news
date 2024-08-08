const ArticleListPagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="mt-4 flex justify-center">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`mx-1 px-3 py-1 border rounded ${
          currentPage === page ? "bg-gray-200" : "bg-white"
        }`}
      >
        {page}
      </button>
    ))}
  </div>
);

export default ArticleListPagination;
