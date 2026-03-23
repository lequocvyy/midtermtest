function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Product Detail</h4>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: "250px", objectFit: "cover", width: "100%" }}
          />

          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>

          <button className="btn btn-dark mt-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;