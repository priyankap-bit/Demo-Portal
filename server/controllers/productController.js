const con = require("../config/db");



//Create New Products
exports.newProducts =  (req, res, next) => {

    const { itemCode, productName, productGroupCode, productGroupName } = req.body;

    const createquery = "INSERT INTO products(itemCode,productName,productGroupCode,productGroupName) VALUES ?";
  
    const values = [[itemCode, productName, productGroupCode, productGroupName]];

    con.query(createquery, [values], async (error, product) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ 
            success: false,
            message: "Error create Product",
          });
        }
        res.status(201).json({
            success: true,
            message: "successfully created new Product",
            product,
          });
    })
}

//get all Products

exports.getAllProducts = (req, res, next) => { 
    const getquery = "SELECT * FROM products";

    con.query(getquery, (error, products) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Error get products",
        });
      }
  
      res.status(201).json({
        success: true,
        error,
        products,
      });
    });
  }