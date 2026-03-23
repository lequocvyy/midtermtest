const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/products.json");

const readProducts = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeProducts = async (products) => {
  try {
    console.log("WRITING FILE:", filePath);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2), "utf-8");
  } catch (err) {
    console.error("WRITE ERROR:", err);
    throw err;
  }
};

module.exports = {
  readProducts,
  writeProducts,
};