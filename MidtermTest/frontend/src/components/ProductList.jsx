import ProductCard from "./ProductCard";

function ProductList({ products, onView, onEdit, onDelete }) {
  if (!products.length) {
    return <p className="text-center mt-4">No products found.</p>;
  }

  return (
    <div className="row">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductList;