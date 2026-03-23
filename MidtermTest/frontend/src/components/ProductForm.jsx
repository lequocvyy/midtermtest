function ProductForm({ formData, setFormData, onSubmit, editing, onCancel }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="mb-3">{editing ? "Update Product" : "Add Product"}</h4>

        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input
              type="number"
              name="stock"
              className="form-control"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <input
              type="text"
              name="image"
              className="form-control"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-primary" onClick={onSubmit}>
            {editing ? "Update" : "Add"}
          </button>

          {editing && (
            <button className="btn btn-secondary" onClick={onCancel}>
              Back to Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductForm;