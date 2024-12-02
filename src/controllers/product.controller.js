import ProductModel from "../models/product.model.js";

class ProductsController {
  getProducts(req, res, next) {
    var products = ProductModel.getAll();
    res.render("index", { products });
  }

  getAddProduct(req, res, next) {
    res.render("new-product", {
      errorMessage: null,
    });
  }

  postAddProduct(req, res, next) {
    const { name, desc, price } = req.body;
    console.log("post", req.body);
    const imageUrl = "images/" + req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
    var products = ProductModel.getAll();
    res.render("index", { products });
  }

  getUpdateProductView(req, res, next) {
    // 1. if product exist  then return view
    // const {id} = req.body;
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    } else {
      res.status(401).send("Product not found");
    }
    // 2. else return errror
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    console.log("req", req.body);
    var products = ProductModel.getAll();
    console.log("prod", products);
    res.render("index", { products });
  }

  deleteProduct(req, res) {
    const id = req.params.id;

    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Product not found");
    }

    ProductModel.delete(id);
    var products = ProductModel.getAll();
    res.render("index", { products });
  }
}

export default ProductsController;
