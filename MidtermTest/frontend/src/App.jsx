import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/productService";

import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetailModal from "./components/ProductDetailModal";
import SearchFilter from "./components/SearchFilter";
import Loading from "./components/Loading";
import "./App.css";

const initialForm = {
  name: "",
  category: "",
  price: "",
  image: "",
  stock: "",
};

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true);
      setError("");
      const data = await getProducts(params);
      setProducts(data || []);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    try {
      setError("");

      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      if (
        !payload.name ||
        !payload.category ||
        !payload.image ||
        payload.price <= 0 ||
        payload.stock < 0
      ) {
        setError("Please enter valid product information.");
        return;
      }

      if (editing) {
        await updateProduct(editing.id, payload);
        setEditing(null);
      } else {
        await createProduct(payload);
      }

      setFormData(initialForm);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Action failed.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteProduct(id);
      if (selectedProduct?.id === id) {
        setSelectedProduct(null);
      }
      fetchProducts();
    } catch (err) {
      setError("Delete failed.");
    }
  };

  const handleEdit = (product) => {
  setEditing(product);

  setFormData({
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
    stock: product.stock,
  });

  // 👇 thêm dòng này
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const handleCancelEdit = () => {
    setEditing(null);
    setFormData(initialForm);
  };

  const handleSearch = () => {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    fetchProducts(params);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    fetchProducts();
  };

  return (
    <div className="app-wrapper">
      <div className="container py-4">
        

        {error && <div className="alert alert-danger">{error}</div>}

        <SearchFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <ProductForm
  formData={formData}
  setFormData={setFormData}
  onSubmit={handleSubmit}
  editing={editing}
  onCancel={handleCancelEdit}
/>

        {loading ? (
          <Loading />
        ) : (
          <ProductList
            products={products}
            onView={setSelectedProduct}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  );
}

export default App;