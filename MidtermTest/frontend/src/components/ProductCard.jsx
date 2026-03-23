function ProductCard({ product, onView, onEdit, onDelete }) {
  if (!product) return null;

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: "220px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="mb-1"><strong>Price:</strong> ${product.price}</p>
          <p className="mb-1"><strong>Category:</strong> {product.category}</p>
          <p className="mb-3"><strong>Stock:</strong> {product.stock}</p>

          <div className="mt-auto d-flex gap-2 flex-wrap">
            <button className="btn btn-outline-primary btn-sm" onClick={() => onView(product)}>
              View
            </button>
            <button className="btn btn-outline-warning btn-sm" onClick={() => onEdit(product)}>
              Edit
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(product.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;