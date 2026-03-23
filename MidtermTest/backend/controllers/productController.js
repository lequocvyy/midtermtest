const { readProducts, writeProducts } = require("../utils/fileHelper");

const getAllProducts = async (req, res) => {
  try {
    let products = await readProducts();
    const { category, search } = req.query;

    if (category) {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi đọc dữ liệu" });
  }
};

const getProductById = async (req, res) => {
  try {
    const products = await readProducts();
    const id = Number(req.params.id);

    const product = products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi đọc dữ liệu" });
  }
};

const validateProduct = ({ name, category, price, image, stock }) => {
  if (!name || !category || price === undefined || !image || stock === undefined) {
    return "Thiếu field bắt buộc";
  }

  if (Number(price) <= 0) {
    return "Price phải lớn hơn 0";
  }

  if (Number(stock) < 0) {
    return "Stock phải lớn hơn hoặc bằng 0";
  }

  return null;
};

const createProduct = async (req, res) => {
  try {
    const error = validateProduct(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const products = await readProducts();

    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price),
      image: req.body.image,
      stock: Number(req.body.stock),
    };

    products.push(newProduct);
    await writeProducts(products);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi thêm sản phẩm" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const error = validateProduct(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const products = await readProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    products[index] = {
      id,
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price),
      image: req.body.image,
      stock: Number(req.body.stock),
    };

    await writeProducts(products);
    res.json(products[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi cập nhật sản phẩm" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const products = await readProducts();

    const product = products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    const newProducts = products.filter((p) => p.id !== id);
    await writeProducts(newProducts);

    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi xóa sản phẩm" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};