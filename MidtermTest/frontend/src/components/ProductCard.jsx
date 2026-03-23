function ProductCard({ product, onView, onEdit, onDelete }) {
  if (!product) return null;

  return (
    <div className="product-card mb-3">
      <div className="d-flex">
        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
        />

        {/* CONTENT */}
        <div className="flex-grow-1 p-3 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="mb-1">{product.name}</h5>
            <span className="badge bg-dark">{product.category}</span>
          </div>

          <p className="text-muted mb-2">${product.price}</p>

          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className={`stock ${product.stock < 5 ? "low" : ""}`}>
              Stock: {product.stock}
            </span>

            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-primary" onClick={() => onView(product)}>
                View
              </button>
              <button className="btn btn-sm btn-outline-warning" onClick={() => onEdit(product)}>
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(product.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;