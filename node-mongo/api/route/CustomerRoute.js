const express = require("express");
const router = express.Router();
const CustomerController = require("../controller/CustomerController");
const verifyToken = require("../middleware/AuthMiddleware");

router.post("/save-customer", verifyToken,CustomerController.saveCustomer);
router.get("/get-customer", verifyToken,CustomerController.findCustomer);
router.put("/update-customer", verifyToken,CustomerController.updateCustomer);
router.delete("/delete-customer", verifyToken,CustomerController.deleteCustomer);
router.get("/get-all-customer", verifyToken,CustomerController.findAllCustomer);

module.exports = router;
